/**
 * Sent to clients if the server caught a problem with a given packet's arguments.
 * @see {@link InvalidPacket} for all possible `InvalidPacket` packet subtypes.
 * @category Network Packets
 */
export interface InvalidArgumentsPacket {
	cmd: 'InvalidPacket';

	/** The type of problem that was detected in the packet. */
	type: 'arguments';

	/** A descriptive message of the problem at hand. */
	text: string;
}
