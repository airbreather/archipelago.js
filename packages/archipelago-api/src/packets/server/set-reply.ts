import type { JSONValue } from '../../json-value';

/**
 * Sent to clients in response to a {@link SetPacket} if `want_reply` was set to true, or if the client has registered
 * to receive updates for a certain key using the {@link SetNotifyPacket}. {@link SetReplyPacket}s are sent even if a
 * {@link SetPacket} package did not alter the value for the key.
 *
 * Additional arguments added to the {@link SetPacket} that triggered this {@link SetReplyPacket} will also be passed
 * along (not directly reflected on this type).
 * @category Network Packets
 */
export interface SetReplyPacket {
	cmd: 'SetReply';

	/** The key that was updated. */
	key: string;

	/** The new value for the key. */
	value: JSONValue;

	/** The value the key had before it was updated. */
	original_value: JSONValue;
}
