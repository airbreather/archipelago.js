import type { Item, JSONMessagePart } from '../../dtos';

/**
 * Sent to clients to broadcast a player has received a cheated item (via `!getitem`).
 * @see {@link PrintJSONPacket} for all possible `PrintJSON` packet subtypes.
 * @category Network Packets
 */
export interface ItemCheatJSONPacket {
	cmd: 'PrintJSON';

	/** The {@link PrintJSONPacket} subtype. */
	type: 'ItemCheat';

	/** All the textual metadata for this packet. */
	data: JSONMessagePart[];

	/** Destination player's identifier. */
	receiving: number;

	/** Source player's identifier, location identifier, item identifier and item flags. */
	item: Item;

	/** Team of the triggering player. */
	team: number;
}
