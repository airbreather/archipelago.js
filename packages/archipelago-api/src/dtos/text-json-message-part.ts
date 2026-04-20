/**
 * A textual node containing plaintext metadata.
 * @see {@link JSONMessagePart} for all possible message part node subtypes.
 */
export interface TextJSONMessagePart {
	/**
	 * Used to denote the intent of the message part.
	 * @remarks If `type` is omitted, it should be treated as the `text` type.
	 */
	type?: 'text' | 'entrance_name' | 'player_id' | 'player_name';

	/** Used to supply text data for this node. */
	text: string;
}
