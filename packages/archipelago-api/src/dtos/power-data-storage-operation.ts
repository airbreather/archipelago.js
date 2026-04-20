/**
 * Multiplies the current value of the key to the power of `value`.
 * @see {@link DataStorageOperation} for all possible operation subtypes.
 * @category DataStorage
 */
export interface PowerDataStorageOperation {
	operation: 'pow';

	/** A value for the operation to apply against the current data storage value. */
	value: number;
}
