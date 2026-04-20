import type { PermissionTable, Player } from '../../dtos';

/**
 * Sent when there is a need to update information about the present game session. Generally useful for **async** games.
 * Once authenticated, this may also contain data from {@link ConnectedPacket}.
 *
 * All arguments for this packet are optional, only changes are sent.
 * @category Network Packets
 */
export interface RoomUpdatePacket {
	cmd: 'RoomUpdate';

	/** Number of hint points that the current player has. */
	hint_points?: number;

	/** Information on the players, whether connected or not. */
	players?: Player[];

	/**
	 * Might be a partial update, containing new locations that were checked, especially from a co-op partner in the
	 * same slot.
	 */
	checked_locations?: number[];

	/** Denotes special features or capabilities that the sender is capable of. Example: `WebHost` */
	tags?: string[];

	/** Denoted whether a password is required to join this room. */
	password?: boolean;

	/** Mapping of restrict-able commands to their current {@link permission} level. */
	permissions: PermissionTable;

	/** The amount of points it costs to receive a hint from the server. */
	hint_cost?: number;

	/** The amount of hint points you receive per item/location check completed. */
	location_check_points?: number;

	/**
	 * Unix time stamp of "now". Send for time synchronization if wanted for things like a DeathLink
	 * {@link BouncePacket}.
	 */
	time?: number;
}
