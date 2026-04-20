/**
 * An enumeration representing the nature of the slot.
 */
export const slotType = {
	/** This client is a spectator and not participating in the current game. */
	spectator: 0,

	/** This client is a player and is participating in the current game. */
	player: 1,

	/** This client is an item links group containing at least 1 player with active item links. */
	group: 2,
} as const;
