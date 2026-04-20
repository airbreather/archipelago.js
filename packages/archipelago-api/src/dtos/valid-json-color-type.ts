/**
 * This is a type union of all supported "colors" denoting a console color to display the message part with and is only
 * sent if the `type` is `color`. This is limited to console colors due to backwards compatibility needs with games such
 * as `A Link to the Past`. Although background colors as well as foreground colors are listed, only one may be applied
 * to a {@link JSONMessagePart} at a time.
 */
export type ValidJSONColorType =
	| 'bold'
	| 'underline'
	| 'black'
	| 'red'
	| 'green'
	| 'yellow'
	| 'blue'
	| 'magenta'
	| 'cyan'
	| 'white'
	| 'black_bg'
	| 'red_bg'
	| 'green_bg'
	| 'yellow_bg'
	| 'blue_bg'
	| 'purple_bg'
	| 'cyan_bg'
	| 'white_bg';
