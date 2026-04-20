import type { Item, JSONMessagePart } from '../../dtos';

/**
 * Sent to clients to broadcast a player has received an item.
 * @see {@link PrintJSONPacket} for all possible `PrintJSON` packet subtypes.
 * @category Network Packets
 */
export interface ItemSendJSONPacket {
	cmd: 'PrintJSON';

	/** The {@link PrintJSONPacket} subtype. */
	type: 'ItemSend';

	/** All the textual metadata for this packet. */
	data: JSONMessagePart[];

	/** Destination player's identifier. */
	receiving: number;

	/** Source player's identifier, location identifier, item identifier and item flags. */
	item: Item;
}
