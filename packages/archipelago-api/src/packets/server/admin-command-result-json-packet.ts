import type { JSONMessagePart } from '../../dtos';

/**
 * Sent to relevant clients to broadcast the result of an admin command.
 * @see {@link PrintJSONPacket} for all possible `PrintJSON` packet subtypes.
 * @category Network Packets
 */
export interface AdminCommandResultJSONPacket {
	cmd: 'PrintJSON';

	/** The {@link PrintJSONPacket} subtype. */
	type: 'AdminCommandResult';

	/** All the textual metadata for this packet. */
	data: JSONMessagePart[];
}
