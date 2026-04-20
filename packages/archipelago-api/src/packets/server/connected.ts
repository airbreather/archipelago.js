import type { Player, Slot } from '../../dtos';
import type { JSONValue } from '../../json-value';

/**
 * Sent to clients when the connection handshake is successfully completed.
 * @category Network Packets
 */
export interface ConnectedPacket {
	cmd: 'Connected';

	/** Your team number. See {@link Player} for more info on team number. */
	team: number;

	/** Your slot number on your team. See {@link Player} for more info on the slot number. */
	slot: number;

	/** List denoting other players in the multi-world, whether connected or not. */
	players: Player[];

	/** Contains integer ids of remaining locations that need to be checked. Useful for trackers, among other things. */
	missing_locations: number[];

	/**
	 * Contains integer ids of all locations that have been checked. Useful for trackers, among other things. Location
	 * ids are valid in the range of  -2^53^ to +(2^53)-1 (inclusive), with negative values and zero reserved for
	 * Archipelago.
	 */
	checked_locations: number[];

	/**
	 * Contains an object of slot related data, which differs per slot. If slot data was not requested in the
	 * {@link ConnectPacket}, this value be an empty object.
	 */
	slot_data: JSONValue;

	/** Object of each slot with their {@link Slot} information. */
	slot_info: Record<string, Slot>;

	/** Number of hint points that the current player has. */
	hint_points: number;
}
