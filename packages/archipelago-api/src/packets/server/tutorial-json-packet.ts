import type { JSONMessagePart } from '../../dtos';

/**
 * Sent to relevant clients to broadcast tutorial information, usually on first connection.
 * @see {@link PrintJSONPacket} for all possible `PrintJSON` packet subtypes.
 * @category Network Packets
 */
export interface TutorialJSONPacket {
	cmd: 'PrintJSON';

	/** The {@link PrintJSONPacket} subtype. */
	type: 'Tutorial';

	/** All the textual metadata for this packet. */
	data: JSONMessagePart[];
}
