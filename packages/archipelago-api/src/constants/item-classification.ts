/**
 * Bit flags that define the special characteristics of a {@link Item}.
 */
export const itemClassification = {
	/** If set, indicates the item may unlock logical advancement. */
	progression: 0b001,

	/** If set, indicates the item is classified as useful to have. */
	useful: 0b010,

	/** If set, indicates the item can inconvenience a player. */
	trap: 0b100,

	/** A shorthand with no flags set, also known as 'filler' or 'junk' items. */
	none: 0,
} as const;
