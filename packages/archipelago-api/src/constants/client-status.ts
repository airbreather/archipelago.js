/**
 *  A const of known containing the possible client states that may be used to inform the server during a status update.
 */
export const clientStatus = {
	/**
	 * Client is in an unknown or disconnected state. This status is set automatically initially and when all connected
	 * clients have disconnected from the server.
	 */
	disconnected: 0,

	/** Client is currently connected. This status is set automatically when a client connects. */
	connected: 5,

	/** Client is ready to start, but hasn't started playing yet. */
	ready: 10,

	/** Client is currently playing. */
	playing: 20,

	/** Client has completed their goal. Once set, cannot be changed. */
	goal: 30,
} as const;
