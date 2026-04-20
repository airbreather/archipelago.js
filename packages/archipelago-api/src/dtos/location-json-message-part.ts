/**
 * A textual node containing location metadata.
 * @see {@link JSONMessagePart} for all possible message part node subtypes.
 */
export interface LocationJSONMessagePart {
	/** Used to denote the intent of the message part. */
	type: 'location_id' | 'location_name';

	/** Used to supply text data for this node. */
	text: string;

	/** The `id` of the player who has this location. */
	player: number;
}
