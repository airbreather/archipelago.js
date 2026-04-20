import type { JSONValue } from '../json-value';

/**
 * List or Dict only: for `lists` it will remove the index of the `value` given. For `dicts` it removes the element with
 * the specified key of `value`.
 * @see {@link DataStorageOperation} for all possible operation subtypes.
 * @category DataStorage
 */
export interface PopDataStorageOperation {
	operation: 'pop';

	/** A value for the operation to apply against the current data storage value. */
	value: JSONValue;
}
