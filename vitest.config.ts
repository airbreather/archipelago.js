import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        tags: [
            {
                name: "integration",
                title: "Integration Tests",
                description: "Tests that require Archipelago to be running",
            },
        ],
        coverage: {
            include: ["src/**/*.{ts,tsx}"],
            reporter: ["text", "json", "json-summary"],
            reportOnFailure: true,
        },
    },
});
