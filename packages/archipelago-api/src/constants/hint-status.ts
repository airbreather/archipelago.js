/**
 * An enumeration representing hint statuses.
 */
export const hintStatus = {
	/** The receiving player has not set a status. */
	unspecified: 0,

	/** The receiving player has specified this item is unnecessary. */
	noPriority: 10,

	/** The receiving player has specified this item is detrimental. */
	avoid: 20,

	/** The receiving player has specified this item is required/important. */
	priority: 30,

	/** The receiving player has received this item. */
	found: 40,
} as const;
