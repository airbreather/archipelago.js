import type { JSONValue } from '../../json-value';

/**
 * Sent by the client to be broadcast from the server to all connected clients that match any one of the filter
 * arguments.
 * @remarks Useful for commonly implemented features such as `DeathLink`.
 * @category Network Packets
 */
export interface BouncePacket {
	cmd: 'Bounce';

	/** Any data you want to send. */
	data: JSONValue & object;

	/** Optional. Games that should receive this message. */
	games?: string[];

	/** Optional. Player ids that should receive this message. */
	slots?: number[];

	/** Optional. Client tags that should receive this message. */
	tags?: string[];
}
