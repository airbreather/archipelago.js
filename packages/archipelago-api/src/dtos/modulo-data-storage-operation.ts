/**
 * Sets the current value of the key to the remainder after division by `value`.
 * @see {@link DataStorageOperation} for all possible operation subtypes.
 * @category DataStorage
 */
export interface ModuloDataStorageOperation {
	operation: 'mod';

	/** A value for the operation to apply against the current data storage value. */
	value: number;
}
