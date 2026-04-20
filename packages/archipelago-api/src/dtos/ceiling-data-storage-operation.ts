/**
 * Rounds up the current value to the nearest integer.
 * @see {@link DataStorageOperation} for all possible operation subtypes.
 * @category DataStorage
 */
export interface CeilingDataStorageOperation {
	operation: 'ceil';

	/** Ignored for this operation. */
	value: null;
}
