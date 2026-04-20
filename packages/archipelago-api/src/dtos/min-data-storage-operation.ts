/**
 * Sets the current value of the key to `value` if `value` is lower.
 * @see {@link DataStorageOperation} for all possible operation subtypes.
 * @category DataStorage
 */
export interface MinDataStorageOperation {
	operation: 'min';

	/** A value for the operation to apply against the current data storage value. */
	value: number;
}
