import { hintStatuses } from "../../constants.ts";

/**
 * Sent by the client to update hint status for a specified location.
 * @category Network Packets
 */
export interface UpdateHintPacket {
    readonly cmd: "UpdateHint"

    /** The ID of the location to update the hint for. If no hint exists for this location, the packet is ignored. */
    readonly location: number

    /** The ID of the player whose location is being hinted for. */
    readonly player: number

    /**
     * Optional. If included, sets the status of the hint to this status. Cannot set {@link hintStatuses.found}, or
     * change the status from {@link hintStatuses.found}.
     */
    readonly status: typeof hintStatuses[keyof typeof hintStatuses]
}
