/**
 * Used to register your current session for receiving all {@link SetReplyPacket}s of certain keys to allow your client
 * to keep track of changes.
 * @category Network Packets
 */
export interface SetNotifyPacket {
	cmd: 'SetNotify';

	/** Keys to receive all {@link SetReplyPacket}s for. */
	keys: string[];
}
