/**
 * A const containing the possible command permissions, for commands that may be restricted.
 */
export const permission = {
	/** Prevents players from using this command at any time. */
	disabled: 0,

	/** Allows players to use this command manually at any time. */
	enabled: 0b001,

	/** Allows players to use this command manually after they have completed their goal. */
	goal: 0b010,

	/**
	 * Forces players to use this command after they have completed their goal.
	 * @remarks Only allowed on `release` and `collect` permissions.
	 */
	auto: 0b110,

	/**
	 * Allows players to use this command manually at any time and forces them to use this command after they have
	 * completed their goal.
	 * @remarks Only allowed on `release` and `collect` permissions.
	 */
	autoEnabled: 0b111,
} as const;
