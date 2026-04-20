/**
 * Applies a bitwise right-shift to the current value of the key by `value`.
 * @see {@link DataStorageOperation} for all possible operation subtypes.
 * @category DataStorage
 */
export interface RightShiftDataStorageOperation {
	operation: 'right_shift';

	/** A value for the operation to apply against the current data storage value. */
	value: number;
}
