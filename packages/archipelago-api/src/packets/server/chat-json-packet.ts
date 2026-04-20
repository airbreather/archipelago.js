import type { JSONMessagePart } from '../../dtos';

/**
 * Sent to clients to broadcast a normal chat message.
 * @see {@link PrintJSONPacket} for all possible `PrintJSON` packet subtypes.
 * @category Network Packets
 */
export interface ChatJSONPacket {
	cmd: 'PrintJSON';

	/** The {@link PrintJSONPacket} subtype. */
	type: 'Chat';

	/** All the textual metadata for this packet. */
	data: JSONMessagePart[];

	/** Team of the triggering player. */
	team: number;

	/** Slot of the triggering player. */
	slot: number;

	/** Original chat message without sender prefix. */
	message: string;
}
