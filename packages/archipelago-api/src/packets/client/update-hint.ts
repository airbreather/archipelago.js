import type { hintStatus } from '../../constants';

/**
 * Sent to the server to update the status of a Hint. The client must be the 'receiving_player' of the Hint, or the update fails.
 * @category Network Packets
 */
export interface UpdateHintPacket {
	cmd: 'UpdateHint';

	/** The ID of the location to update the hint for. If no hint exists for this location, the packet is ignored. */
	location: number;

	/** The ID of the player whose location is being hinted for. */
	player: number;

	/**
	 * Optional. If included, sets the status of the hint to this status. Cannot set {@link hintStatus.found}, or
	 * change the status from {@link hintStatus.found}.
	 */
	status: typeof hintStatus[keyof typeof hintStatus];
}
