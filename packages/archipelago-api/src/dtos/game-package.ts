/**
 * Collection of data that contains meta information for a particular game.
 */
export interface GamePackage {
	/** Mapping of all item names to their respective id. */
	item_name_to_id: Record<string, number>;

	/** Mapping of all location names to their respective id. */
	location_name_to_id: Record<string, number>;

	/** SHA1 checksum of this game's data. */
	checksum: string;
}
