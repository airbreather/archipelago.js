import type { JSONMessagePart } from '../../dtos';

/**
 * Sent to clients to broadcast a client has connected.
 * @see {@link PrintJSONPacket} for all possible `PrintJSON` packet subtypes.
 * @category Network Packets
 */
export interface JoinJSONPacket {
	cmd: 'PrintJSON';

	/** The {@link PrintJSONPacket} subtype. */
	type: 'Join';

	/** All the textual metadata for this packet. */
	data: JSONMessagePart[];

	/** Team of the triggering player. */
	team: number;

	/** Slot of the triggering player. */
	slot: number;

	/** Tags of the triggering player. */
	tags: string[];
}
