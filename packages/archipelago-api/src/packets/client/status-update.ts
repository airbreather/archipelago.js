import type { clientStatus } from '../../constants';

/**
 * Sent to the server to update on the client's status. Examples include readiness or goal completion.
 * @category Network Packets
 */
export interface StatusUpdatePacket {
	cmd: 'StatusUpdate';

	/**
	 * The new client status value to set this slot to. See {@link clientStatus} for all known values.
	 * @remarks This packet is ignored if the client status was set to {@link clientStatus.goal}.
	 */
	status: typeof clientStatus[keyof typeof clientStatus];
}
