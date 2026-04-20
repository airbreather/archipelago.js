import type { JSONValue } from '../json-value';

/**
 * Adds `value` to the current value of the key, if both the current value and `value` are arrays then `value` will be
 * appended to the current value.
 * @see {@link DataStorageOperation} for all possible operation subtypes.
 * @category DataStorage
 */
export interface AddDataStorageOperation {
	operation: 'add';

	/** A value for the operation to apply against the current data storage value. */
	value: number | JSONValue[];
}
