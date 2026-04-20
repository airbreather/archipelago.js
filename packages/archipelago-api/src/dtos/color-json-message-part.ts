import type { ValidJSONColorType } from './valid-json-color-type';

/**
 * A textual node containing color metadata.
 * @see {@link JSONMessagePart} for all possible message part node subtypes.
 */
export interface ColorJSONMessagePart {
	/** Used to denote the intent of the message part. */
	type: 'color';

	/** Used to supply text data for this node. */
	text: string;

	/** Includes the color to print this text with. */
	color: ValidJSONColorType;
}
