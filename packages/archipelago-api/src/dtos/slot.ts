import type { slotType } from '../constants';

/**
 * An object representing metadata about a given slot on each team.
 */
export interface Slot {
	/**
	 * The original slot name as defined by the player's configuration file. Individual names are unique among players.
	 */
	name: string;

	/** The game this slot is playing. */
	game: string;

	/** The type of slot this is. See {@link slotType} for known slot types. */
	type: typeof slotType[keyof typeof slotType];

	/**
	 * Contains a list of player ids, if the `type` is {@link slotType.group}. Used for item links, otherwise empty.
	 */
	group_members: number[];
}
