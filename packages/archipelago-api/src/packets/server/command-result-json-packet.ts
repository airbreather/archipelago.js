import type { JSONMessagePart } from '../../dtos';

/**
 * Sent to relevant clients to broadcast the result of a chat command.
 * @see {@link PrintJSONPacket} for all possible `PrintJSON` packet subtypes.
 * @category Network Packets
 */
export interface CommandResultJSONPacket {
	cmd: 'PrintJSON';

	/** The {@link PrintJSONPacket} subtype. */
	type: 'CommandResult';

	/** All the textual metadata for this packet. */
	data: JSONMessagePart[];
}
