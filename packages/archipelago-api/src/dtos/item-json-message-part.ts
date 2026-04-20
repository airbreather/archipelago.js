/**
 * A textual node containing item metadata.
 * @see {@link JSONMessagePart} for all possible message part node subtypes.
 */
export interface ItemJSONMessagePart {
	/** Used to denote the intent of the message part. */
	type: 'item_id' | 'item_name';

	/** Used to supply text data for this node. */
	text: string;

	/** Bit flags that determine if an item is progression, "nice to have", filler, or a trap. */
	flags: number;

	/** The `id` of the player who owns this item. */
	player: number;
}
