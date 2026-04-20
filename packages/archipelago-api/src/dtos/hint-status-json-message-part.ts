import type { hintStatus } from '../constants';

/**
 * A textual node containing item metadata.
 * @see {@link JSONMessagePart} for all possible message part node subtypes.
 */
export interface HintStatusJSONMessagePart {
	/** Used to denote the intent of the message part. */
	type: 'hint_status';

	/** Used to supply text data for this node. */
	text: string;

	/** The status of the hint */
	hint_status: typeof hintStatus;
}
