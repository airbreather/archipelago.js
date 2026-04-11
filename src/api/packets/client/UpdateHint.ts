import { hintStatuses } from "../../constants.ts";

/**
 * Sent by the client to update hint status for a specified location.
 * @category Network Packets
 */
export interface UpdateHintPacket {
    readonly cmd: "UpdateHint"

    /** The location id to update. */
    readonly location: number

    /** The id of the sending player. */
    readonly player: number

    /** The status to set these hints to, if provided. */
    readonly status: typeof hintStatuses[keyof typeof hintStatuses]
}
