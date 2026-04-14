import { describe, afterAll, test } from "bun:test";

import { Client } from "../../src";

describe("smoke tests", () => {
    const client = new Client();
    afterAll(() => client.socket.disconnect());

    test("smoke test", async () => {
        const url = "ws://localhost:38281";
        const slotName = "APQuestPlayer";

        await client.login(url, slotName, "APQuest");

        const unlikelyMessage = "it is unlikely that someone would send this message especially with this speling error";

        const messageReceived = new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error("Timeout waiting for message response"));
            }, 5000);

            client.messages.on("message", (text) => {
                if (text.includes(unlikelyMessage)) {
                    clearTimeout(timeout);
                    resolve();
                }
            });
        });

        await client.messages.say(unlikelyMessage);
        await messageReceived;
    });
});
