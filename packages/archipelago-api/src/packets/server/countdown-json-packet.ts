import type { JSONMessagePart } from '../../dtos';

/**
 * Sent to clients to broadcast a countdown message, usually for counting down the start of a game.
 * @see {@link PrintJSONPacket} for all possible `PrintJSON` packet subtypes.
 * @category Network Packets
 */
export interface CountdownJSONPacket {
	cmd: 'PrintJSON';

	/** The {@link PrintJSONPacket} subtype. */
	type: 'Countdown';

	/** All the textual metadata for this packet. */
	data: JSONMessagePart[];

	/** Amount of seconds remaining on the countdown. */
	countdown: number;
}
