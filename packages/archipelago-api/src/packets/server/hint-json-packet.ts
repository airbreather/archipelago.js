import type { Item, JSONMessagePart } from '../../dtos';

/**
 * Sent to relevant clients to broadcast item hint information.
 * @see {@link PrintJSONPacket} for all possible `PrintJSON` packet subtypes.
 * @category Network Packets
 */
export interface HintJSONPacket {
	cmd: 'PrintJSON';

	/** The {@link PrintJSONPacket} subtype. */
	type: 'Hint';

	/** All the textual metadata for this packet. */
	data: JSONMessagePart[];

	/** Destination player's identifier. */
	receiving: number;

	/** Source player's identifier, location identifier, item identifier and item flags. */
	item: Item;

	/** Whether the location hinted for was checked. */
	found: boolean;
}
