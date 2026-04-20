import type { JSONValue } from '../../json-value';

/**
 * Sent to clients after a client requested this message be sent to them, more info in the {@link BouncePacket}.
 * @category Network Packets
 */
export interface BouncedPacket {
	cmd: 'Bounced';

	/** Optional. Game names this message is targeting. */
	games?: string[];

	/** Optional. Player slot IDs that this message is targeting. */
	slots?: number[];

	/** Optional. Client tags this message is targeting. */
	tags?: string[];

	/** A verbatim copy of the data in the {@link BouncePacket} package. */
	data: JSONValue & object;
}
