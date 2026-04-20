/**
 * Applies a bitwise **XOR** to the current value of the key with `value`.
 * @see {@link DataStorageOperation} for all possible operation subtypes.
 * @category DataStorage
 */
export interface XorDataStorageOperation {
	operation: 'xor';

	/** A value for the operation to apply against the current data storage value. */
	value: number;
}
