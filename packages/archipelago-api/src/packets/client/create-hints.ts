import type { hintStatus } from '../../constants';

/**
 * Sent by the client to create hints for a specified list of locations.
 * @category Network Packets
 */
export interface CreateHintsPacket {
	cmd: 'CreateHints';

	/** A list of locations to hint. */
	locations: number[];

	/** The id of the player locations are being hinted for. Defaults to the current client's slot. */
	player?: number;

	/** The status to set these hints to, if provided. */
	status?: typeof hintStatus[keyof typeof hintStatus];
}
