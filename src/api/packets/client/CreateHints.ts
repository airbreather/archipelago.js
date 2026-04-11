import { hintStatuses } from "../../constants.ts";

/**
 * Sent by the client to create hints for a specified list of locations.
 * @category Network Packets
 */
export interface CreateHintsPacket {
    readonly cmd: "CreateHints"

    /** A list of locations to hint. */
    readonly locations: number[]

    /** The id of the player locations are being hinted for. Defaults to the current client's slot. */
    readonly player?: number

    /** The status to set these hints to, if provided. */
    readonly status?: typeof hintStatuses[keyof typeof hintStatuses]
}
