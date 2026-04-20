import type { permission } from '../constants';

/** Mapping of restrict-able commands to their current {@link permission} level. */
export interface PermissionTable {
	/**
	 * Dictates what is allowed when it comes to a player releasing their run. A release is an action which
	 * distributes the rest of the items in a player's run to those other players awaiting them.
	 *
	 * - {@link permission.auto}: Distributes a player's items to other players when they complete their goal.
	 * - {@link permission.enabled}: Denotes that players may `!release` at any time in the game.
	 * - {@link permission.autoEnabled}: Both of the above options together.
	 * - {@link permission.disabled}: All forfeit modes disabled.
	 * - {@link permission.goal}: Allows for manual use of `!release` command once a player completes their
	 * goal (disabled until goal completion).
	 */
	release: typeof permission[keyof typeof permission];

	/**
	 * Dictates what is allowed when it comes to a player collecting their run. A collect is an action which sends
	 * the rest of the items in a player's run.
	 *
	 * - {@link permission.auto}: Automatically when they complete their goal.
	 * - {@link permission.enabled}: Denotes that players may `!collect` at any time in the game.
	 * - {@link permission.autoEnabled}: Both of the above options together.
	 * - {@link permission.disabled}: All collect modes disabled.
	 * - {@link permission.goal}: Allows for manual use of `!collect` command once a player completes their
	 * goal (disabled until goal completion).
	 */
	collect: typeof permission[keyof typeof permission];

	/**
	 * Dictates what is allowed when it comes to a player querying the items remaining in their run.
	 *
	 * - {@link permission.goal}: Allows a player to query for items remaining in their run but only after they
	 * completed their own goal.
	 * - {@link permission.enabled}: Denotes that players may query for any items remaining in their run (even
	 * those belonging to other players).
	 * - {@link permission.disabled}: All remaining item query modes disabled.
	 * @remarks This command cannot have the {@link permission.auto} or {@link permission.autoEnabled} permission.
	 */
	remaining: Omit<typeof permission[keyof typeof permission], typeof permission.auto | typeof permission.autoEnabled>;
}
