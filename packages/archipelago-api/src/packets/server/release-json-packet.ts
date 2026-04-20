import type { JSONMessagePart } from '../../dtos';

/**
 * Sent to clients to broadcast a player has released all remaining items in their world.
 * @see {@link PrintJSONPacket} for all possible `PrintJSON` packet subtypes.
 * @category Network Packets
 */
export interface ReleaseJSONPacket {
	cmd: 'PrintJSON';

	/** The {@link PrintJSONPacket} subtype. */
	type: 'Release';

	/** All the textual metadata for this packet. */
	data: JSONMessagePart[];

	/** Team of the triggering player. */
	team: number;

	/** Slot of the triggering player. */
	slot: number;
}
