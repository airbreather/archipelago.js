import { DataPackage, DataPackageCache, GamePackage, GetDataPackagePacket } from "../../api";
import { Client } from "../Client.ts";
import { PackageMetadata } from "../PackageMetadata.ts";

/**
 * Managers data packages metadata and exposes name lookup methods.
 */
export class DataPackageManager {
    readonly #client: Client;
    readonly #packages = new Map<string, PackageMetadata>();
    readonly #checksums = new Map<string, string>();
    readonly #games = new Set<string>();
    #cache: DataPackageCache | null;

    /**
     * Instantiates a new DataPackageManager. Should only be instantiated by creating a new {@link Client}.
     * @internal
     * @param client The client object this manager is associated with.
     */
    public constructor(client: Client) {
        this.#client = client;
        this.#client.socket.on("roomInfo", (packet) => {
            this.#checksums.clear();
            this.#games.clear();

            this.#packages.set("Archipelago", this.#preloadArchipelago());
            for (const game in packet.datapackage_checksums) {
                this.#checksums.set(game, packet.datapackage_checksums[game]);
                this.#games.add(game);
            }
        });

        // Register the default cache only if this environment supports it.
        // Library users can override this with setCache if they wish.
        if (typeof window === 'object' && typeof window.indexedDB === 'object') {
            this.#cache = this.#defaultIndexedDbCache;
        } else {
            this.#cache = null;
        }
    }

    /**
     * Returns the package metadata helper object for a specified game. If game package does not exist in cache, returns
     * `null` instead.
     * @param game The specific game package to look up.
     */
    public findPackage(game: string): PackageMetadata | null {
        return this.#packages.get(game) ?? null;
    }

    /**
     * Sets up a custom data package caching implementation, which will be used when fetching the data package.
     * @remarks The library provides a default caching mechanism using IndexedDB in environments where IndexedDB
     * is available (which more or less just means in browsers). Setting your own caching implementation overrides
     * the default implementation, meaning that nothing will be either saved to or loaded from the default cache. This
     * can you give more control over the cache, and is required if you want to have data package caching in a
     * non-browser environment.
     */
    public setCache(cache: DataPackageCache) {
        this.#cache = cache;
    }

    /**
     * Fetches and returns the {@link DataPackage} from the server, if the games are not locally cached or checksums
     * do not match.
     * @param games A list of game packages to fetch. If omitted, will fetch all available game packages from the
     * current room.
     * @param update If `true`, after fetching the data package, any changes will automatically be updated without
     * needing to manually call {@link DataPackageManager.importPackage}.
     * @remarks It is recommended to export and locally cache the data package after fetching, then prior to any future
     * connections, importing the locally cached package to reduce unnecessary network bandwidth.
     *
     * Any requested games that do not exist in the current room will be ignored.
     */
    public async fetchPackage(games: string[] = [], update = true): Promise<DataPackage> {
        // If an empty array was provided, get all games in current room.
        if (games.length === 0) {
            games = Array.from(this.#games);
        }

        // Ignore any game packages with checksums that match cached version (to save network bandwidth).
        games = games.filter((game) => {
            // Game doesn't exist in this room, so it's definitely not needed.
            if (!this.#games.has(game)) return false;

            // Mismatched checksums (or no cached data package), it will be required.
            if (this.#packages.get(game)?.checksum !== this.#checksums.get(game)) return true;

            // Any other situation, it's not needed.
            return false;
        });

        // Check for games in cache prior to requesting data package from server
        if (this.#cache) {
            const data: DataPackage = { games: {} };
            const notFoundGames = [];
            for (const game of games) {
                const cachedPackage = await this.#cache.getPackage(game, this.#checksums.get(game));
                if (cachedPackage) {
                    data.games[game] = cachedPackage;
                } else {
                    notFoundGames.push(game);
                }
            }
            if (update) {
                this.importPackage(data);
            }
            games = notFoundGames;
        }

        // Request each game individually to reduce likelihood of a large packet causing a spike in network usage.
        const data: DataPackage = { games: {} };
        for (const game of games) {
            const request: GetDataPackagePacket = { cmd: "GetDataPackage", games: [game] };
            const [response] = await this.#client.socket
                .send(request)
                .wait("dataPackage");

            data.games[game] = response.data.games[game];
        }

        if (update) {
            this.importPackage(data);
        }

        if (this.#cache && this.#cache.cachePackages) {
            this.#cache.cachePackages(data.games);
        }

        return data;
    }

    /**
     * Import a {@link DataPackage} object to prepopulate local cache.
     * @param dataPackage The package to import.
     * @remarks It is recommended to export/import any data packages ahead of time to reduce unnecessary calls to
     * {@link DataPackageManager.fetchPackage} and reduce connection startup time and lighten network overhead. See
     * below for an example.
     * @example <caption>Node.js</caption>
     * import fs from "node:fs";
     * import { Client } from "archipelago.js";
     *
     * const data = fs.readFileSync("path/to/cache/datapackage_cache.json");
     * const client = new Client();
     *
     * client.package.importPackage(JSON.parse(data));
     * await client.login("wss://archipelago.gg:38281", "Phar", "Clique");
     * @example <caption>Modern browser (using localStorage and ES-syntax)</caption>
     * <script src="archipelago.js" type="module">
     *     import { Client } from "archipelago.js";
     *
     *     const data = localStorage.getItem("datapackage_cache");
     *     const client = new Client();
     *
     *     client.package.importPackage(JSON.parse(data));
     *     await client.login("wss://archipelago.gg:38281", "Phar", "Clique");
     * </script>
     */
    public importPackage(dataPackage: DataPackage): void {
        for (const game in dataPackage.games) {
            this.#packages.set(game, new PackageMetadata(game, dataPackage.games[game]));
            this.#checksums.set(game, dataPackage.games[game].checksum);
        }
    }

    /**
     * Export a {@link DataPackage} object for local caching purposes.
     * @remarks It is recommended to export/import any data packages ahead of time to reduce unnecessary calls to
     * {@link DataPackageManager.fetchPackage} and reduce connection startup time and lighten network overhead. See
     * below for an example.
     * @example <caption>Node.js</caption>
     * import fs from "node:fs";
     * import { Client } from "archipelago.js";
     *
     * // ... misc client code (connecting and fetching data package).
     *
     * // Save data package to a local file.
     * const data = client.package.exportPackage();
     * fs.writeFileSync("path/to/cache/datapackage_cache.json", JSON.stringify(data), "utf8");
     */
    public exportPackage(): DataPackage {
        const games: Record<string, GamePackage> = {};
        for (const [game, pkg] of this.#packages.entries()) {
            games[game] = pkg.exportPackage();
        }

        return { games };
    }

    /**
     * Lookup an item name by its integer id.
     * @param game The name of the game this item is associated with.
     * @param id The id of the item to name lookup.
     * @param fallback If `true`, returns `"Unknown Item {id}"` instead of `undefined`, if id does not exist in package.
     * Defaults to `true`, if omitted.
     */
    public lookupItemName(game: string, id: number, fallback?: true): string;

    /**
     * Lookup an item name by its integer id.
     * @param game The name of the game this item is associated with.
     * @param id The id of the item to name lookup.
     * @param fallback If `true`, returns `"Unknown Item {id}"` instead of `undefined`, if id does not exist in package.
     * Defaults to `true`, if omitted.
     */
    public lookupItemName(game: string, id: number, fallback: false): string | undefined;

    public lookupItemName(game: string, id: number, fallback: boolean = true): string | undefined {
        const fallbackName = `Unknown Item ${id}`;
        const gamePackage = this.findPackage(game);
        if (!gamePackage) {
            return fallback ? fallbackName : undefined;
        }

        const name = gamePackage.reverseItemTable[id];
        if (fallback && name === undefined) {
            return fallbackName;
        }

        return name;
    }

    /**
     * Lookup a location name by its integer id.
     * @param game The name of the game this location is associated with.
     * @param id The id of the location to name lookup.
     * @param fallback If `true`, returns `"Unknown Location {id}"` instead of `undefined`, if id does not exist in
     * package. Defaults to `true`, if omitted.
     */
    public lookupLocationName(game: string, id: number, fallback?: true): string;

    /**
     * Lookup a location name by its integer id.
     * @param game The name of the game this location is associated with.
     * @param id The id of the location to name lookup.
     * @param fallback If `true`, returns `"Unknown Location {id}"` instead of `undefined`, if id does not exist in
     * package. Defaults to `true`, if omitted.
     */
    public lookupLocationName(game: string, id: number, fallback: false): string | undefined;

    public lookupLocationName(game: string, id: number, fallback: boolean = true): string | undefined {
        const fallbackName = `Unknown Location ${id}`;
        const gamePackage = this.findPackage(game);
        if (!gamePackage) {
            return fallback ? fallbackName : undefined;
        }

        const name = gamePackage.reverseLocationTable[id];
        if (fallback && name === undefined) {
            return fallbackName;
        }

        return name;
    }

    /**
     * Returns preloaded data (i.e., Archipelago data package, since it's always available).
     * @private
     * @remarks If updates to the AP game package happen, this should be updated.
     */
    #preloadArchipelago(): PackageMetadata {
        // As of AP 0.5.0
        return new PackageMetadata("Archipelago", {
            checksum: "ac9141e9ad0318df2fa27da5f20c50a842afeecb",
            item_name_to_id: { Nothing: -1 },
            location_name_to_id: { "Cheat Console": -1, "Server": -2 },
        });
    }

    /**
     * The default cache used in environments where IndexedDB is available.
     */
    #defaultIndexedDbCache: DataPackageCache = {
        getPackage(gameName: string, checksum?: string): Promise<GamePackage | null> {
            if (!checksum) {
                return Promise.resolve(null);
            }

            return new Promise((resolve) => {
                withIDBCacheStore('readwrite', (store) => {
                    const getRequest = store.get(`${gameName}-${checksum}`);

                    getRequest.onsuccess = () => {
                        if (getRequest.result === undefined) {
                            resolve(null);
                        } else if (getRequest.result.name !== gameName) {
                            // Something went wrong, remove from cache.
                            store.delete(`${gameName}-${checksum}`);
                            resolve(null);
                        } else {
                            store.put({ ...getRequest.result, lastRead: Date.now() }, `${gameName}-${checksum}`);
                            resolve(getRequest.result.package);
                        }
                    };
                }, () => {
                    resolve(null);
                });
            });
        },
        cachePackages(dataPackageToSync: Record<string, GamePackage>) {
            withIDBCacheStore('readwrite', (store) => {
                for (const [gameName, gamePackage] of Object.entries(dataPackageToSync)) {
                    const getRequest = store.get(`${gameName}-${gamePackage.checksum}`);

                    getRequest.onsuccess = () => {
                        if (getRequest.result === undefined) {
                            const addRequest = store.add(
                                { name: gameName, package: gamePackage, lastRead: Date.now() },
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
                const lastReadIndex = store.index('lastRead');
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
        }
    }
}

/**
 * Helper function for getting the data package cache store from the IndexedDB.
 */
function withIDBCacheStore(
    accessMode: IDBTransactionMode,
    callback: (store: IDBObjectStore) => void,
    onError: () => void = () => {},
) {
    const CACHE_DB_NAME = 'DataPackageCacheDatabase';
    const CACHE_DB_VERSION = 2;
    const CACHE_STORE_NAME = 'dataPackageCache';

    const dbRequest = window.indexedDB.open(CACHE_DB_NAME, CACHE_DB_VERSION);

    dbRequest.onerror = onError;

    dbRequest.onupgradeneeded = (event) => {
        const db = dbRequest.result;

        if (event.oldVersion < 2 && db.objectStoreNames.contains(CACHE_STORE_NAME)) {
            db.deleteObjectStore(CACHE_STORE_NAME);
        }

        if (!db.objectStoreNames.contains(CACHE_STORE_NAME)) {
            const store = db.createObjectStore(CACHE_STORE_NAME);
            store.createIndex('lastRead', 'lastRead', { unique: false });
        }
    };

    dbRequest.onsuccess = () => {
        const db = dbRequest.result;

        const transaction = db.transaction(CACHE_STORE_NAME, accessMode);
        const store = transaction.objectStore(CACHE_STORE_NAME);

        transaction.onerror = () => {
            db.close();
            onError();
        };

        transaction.oncomplete = () => {
            db.close();
        };

        callback(store);
    };
}
