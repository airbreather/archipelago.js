/**
 * Rounds down the current value to the nearest integer.
 * @see {@link DataStorageOperation} for all possible operation subtypes.
 * @category DataStorage
 */
export interface FloorDataStorageOperation {
	operation: 'floor';

	/** Ignored for this operation. */
	value: null;
}
