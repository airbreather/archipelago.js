import { DataPackageCache, GamePackage } from "../api";

/**
 * The default data package cache for browser environments.
 * @internal
 */
export class DefaultIndexedDBCache implements DataPackageCache {
    getPackage(gameName: string, checksum?: string): Promise<GamePackage | null> {
        if (!checksum) {
            return Promise.resolve(null);
        }

        return new Promise((resolve) => {
            void this.#withIDBCacheStore("readwrite", (store) => {
                const getRequest = store.get(`${gameName}-${checksum}`);

                getRequest.onsuccess = () => {
                    const result = getRequest.result as IDBCacheEntry | undefined;

                    if (result === undefined) {
                        resolve(null);
                    } else if (result.name !== gameName) {
                        // Something went wrong, remove from cache.
                        store.delete(`${gameName}-${checksum}`);
                        resolve(null);
                    } else {
                        const entry: IDBCacheEntry = { ...result, lastRead: Date.now() };
                        store.put(entry, `${gameName}-${checksum}`);
                        resolve(result.package);
                    }
                };
            }, () => {
                resolve(null);
            });
        });
    };

    cachePackages(dataPackageToSync: Record<string, GamePackage>): Promise<void> {
        return this.#withIDBCacheStore("readwrite", (store) => {
            for (const [gameName, gamePackage] of Object.entries(dataPackageToSync)) {
                const getRequest = store.get(`${gameName}-${gamePackage.checksum}`);

                getRequest.onsuccess = () => {
                    if (getRequest.result === undefined) {
                        const entry: IDBCacheEntry = { name: gameName, package: gamePackage, lastRead: Date.now() };
                        const addRequest = store.add(
                            entry,
                            `${gameName}-${gamePackage.checksum}`,
                        );
                        addRequest.onerror = (event) => {
                            // Continue with the rest of the transaction even if one insert fails.
                            event.preventDefault();
                        };
                    }
                };
            }

            // Prune old game packages from the cache.
            const MAX_GAME_PACKAGE_AGE_MS = 1000 * 60 * 60 * 24 * 30 * 3; // ~3 months
            const lastReadIndex = store.index("lastRead");
            const tooOldRange = IDBKeyRange.upperBound(Date.now() - MAX_GAME_PACKAGE_AGE_MS);
            const cursorRequest = lastReadIndex.openKeyCursor(tooOldRange);
            cursorRequest.onsuccess = () => {
                const cursor = cursorRequest.result;
                if (cursor) {
                    store.delete(cursor.primaryKey);
                    cursor.continue();
                }
            };
        });
    };

    /**
     * Helper function for the IndexedDB cache: Executes a callback with a reference to the data package cache store
     * from the IndexedDB.
     * @param accessMode The transaction mode to use when getting the store.
     * @param callback The function to call with the store.
     * @param onError A callback which will be called when an error is encountered with the IndexedDB.
     * @returns A promise resolving when the IndexedDB transaction is closed.
     * @private
     */
    #withIDBCacheStore(
        accessMode: IDBTransactionMode,
        callback: (store: IDBObjectStore) => void,
        onError: () => void = () => null,
    ): Promise<void> {
        return new Promise((resolve) => {
            const CACHE_DB_NAME = "DataPackageCacheDatabase";
            const CACHE_DB_VERSION = 2;
            const CACHE_STORE_NAME = "dataPackageCache";

            const dbRequest = window.indexedDB.open(CACHE_DB_NAME, CACHE_DB_VERSION);

            dbRequest.onerror = () => {
                onError();
                resolve();
            };

            dbRequest.onupgradeneeded = (event) => {
                const db = dbRequest.result;

                if (event.oldVersion < 2 && db.objectStoreNames.contains(CACHE_STORE_NAME)) {
                    db.deleteObjectStore(CACHE_STORE_NAME);
                }

                if (!db.objectStoreNames.contains(CACHE_STORE_NAME)) {
                    const store = db.createObjectStore(CACHE_STORE_NAME);
                    store.createIndex("lastRead", "lastRead", { unique: false });
                }
            };

            dbRequest.onsuccess = () => {
                const db = dbRequest.result;

                const transaction = db.transaction(CACHE_STORE_NAME, accessMode);
                const store = transaction.objectStore(CACHE_STORE_NAME);

                transaction.onerror = () => {
                    db.close();
                    onError();
                    resolve();
                };

                transaction.oncomplete = () => {
                    db.close();
                    resolve();
                };

                callback(store);
            };
        });
    };
}

interface IDBCacheEntry {
    name: string
    package: GamePackage
    lastRead: number
}
