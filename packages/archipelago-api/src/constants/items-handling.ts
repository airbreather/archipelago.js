/**
 * Bit flags configuring which items should be sent by the server to this client.
 */
export const itemsHandling = {
	/** Indicates the client only receives items created by cheat commands. */
	minimal: 0b000,

	/** Indicates the client get items sent from other worlds. */
	others: 0b001,

	/** Indicates the client get items sent from your own world. Requires `others` bitflag to be set. */
	own: 0b010,

	/** Indicates the client get your starting inventory sent. Requires `others` bitflag to be set. */
	starting: 0b100,

	/** Shorthand for `others`, `own`, and `starting`. */
	all: 0b111,
} as const;
