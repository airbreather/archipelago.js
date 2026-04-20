/**
 * Multiplies the current value of the key by `value`.
 * @see {@link DataStorageOperation} for all possible operation subtypes.
 * @category DataStorage
 */
export interface MultiplyDataStorageOperation {
	operation: 'mul';

	/** A value for the operation to apply against the current data storage value. */
	value: number;
}
