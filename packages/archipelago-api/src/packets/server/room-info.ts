import type { NetworkVersion, PermissionTable } from '../../dtos';

/**
 * Sent to clients when they connect to an Archipelago server, but before they authenticate.
 * @category Network Packets
 */
export interface RoomInfoPacket {
	cmd: 'RoomInfo';

	/** Object denoting the version of Archipelago which the server is running. */
	version: NetworkVersion;

	/** Object denoting the version of Archipelago which generated the multi-world. */
	generator_version: NetworkVersion;

	/** Denotes special features or capabilities that the sender is capable of. Example: `WebHost` */
	tags: string[];

	/** Denoted whether a password is required to join this room. */
	password: boolean;

	/** Mapping of restrict-able commands to their current {@link permission} level. */
	permissions: PermissionTable;

	/** The amount of points it costs to receive a hint from the server. */
	hint_cost: number;

	/** The amount of hint points you receive per item/location check completed. */
	location_check_points: number;

	/** List of games present in this multi-world. */
	games: string[];

	/**
	 * Checksum hash of the individual games' data packages the server will send. Used by newer clients to decide which
	 * games' caches are outdated. See {@link DataPackage} for more information on the data package.
	 */
	datapackage_checksums: Record<string, string>;

	/** Uniquely identifying name for this generation. Based on the `seed`, but not identical to prevent spoilers. */
	seed_name: string;

	/**
	 * Unix time stamp in seconds of "now". Sent for time synchronization if wanted for things like a DeathLink
	 * {@link BouncePacket}.
	 */
	time: number;
}
