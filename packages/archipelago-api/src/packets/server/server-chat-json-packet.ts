import type { JSONMessagePart } from '../../dtos';

/**
 * Sent to clients to broadcast a server-side chat message.
 * @see {@link PrintJSONPacket} for all possible `PrintJSON` packet subtypes.
 * @category Network Packets
 */
export interface ServerChatJSONPacket {
	cmd: 'PrintJSON';

	/** The {@link PrintJSONPacket} subtype. */
	type: 'ServerChat';

	/** All the textual metadata for this packet. */
	data: JSONMessagePart[];

	/** Original chat message without sender prefix. */
	message: string;
}
