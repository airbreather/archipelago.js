/**
 * Sent to clients if the server caught a problem with a given packet's `cmd` property.
 * @see {@link InvalidPacket} for all possible `InvalidPacket` packet subtypes.
 * @category Network Packets
 */
export interface InvalidCommandPacket {
	cmd: 'InvalidPacket';

	/** The type of problem that was detected in the packet. */
	type: 'cmd';

	/** The `cmd` argument of the faulty packet. */
	original_cmd: string;

	/** A descriptive message of the problem at hand. */
	text: string;
}
