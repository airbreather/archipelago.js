import type { Item } from '../../dtos';

/**
 * Sent to clients when they receive an item.
 * @category Network Packets
 */
export interface ReceivedItemsPacket {
	cmd: 'ReceivedItems';

	/** The next empty slot in the list of items for the receiving client. Useful for tracking items. */
	index: number;

	/** The items which the client is receiving. */
	items: Item[];
}
