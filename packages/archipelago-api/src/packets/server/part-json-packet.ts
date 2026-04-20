import type { JSONMessagePart } from '../../dtos';

/**
 * Sent to clients to broadcast a client has disconnected.
 * @see {@link PrintJSONPacket} for all possible `PrintJSON` packet subtypes.
 * @category Network Packets
 */
export interface PartJSONPacket {
	cmd: 'PrintJSON';

	/** The {@link PrintJSONPacket} subtype. */
	type: 'Part';

	/** All the textual metadata for this packet. */
	data: JSONMessagePart[];

	/** Team of the triggering player. */
	team: number;

	/** Slot of the triggering player. */
	slot: number;
}
