export type JSONValue = null
	| string
	| number
	| boolean
	| JSONValue[]
	| { [k in string]?: JSONValue };
