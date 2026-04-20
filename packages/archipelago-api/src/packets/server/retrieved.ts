/**
 * Sent to clients as a response to a {@link GetPacket}.
 *
 * Additional arguments added to the {@link GetPacket} that triggered this {@link RetrievedPacket} will also be passed
 * along.
 * @category Network Packets
 */
export interface RetrievedPacket {
	cmd: 'Retrieved';
}
