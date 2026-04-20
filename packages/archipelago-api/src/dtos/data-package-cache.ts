import type { GamePackage } from './game-package';

/** An interface for fetching data packages from a cache, Should return a {@link GamePackage} if available, else null */
export interface DataPackageCache {
	getPackage(game: string, checksum?: string): PromiseLike<GamePackage | null>;
}
