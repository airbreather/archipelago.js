import dts from "bun-plugin-dts";

const baseConfig: Bun.BuildConfig = {
    entrypoints: ["./src/index.ts"],
    outdir: "./dist",
    sourcemap: "linked",
};

await Bun.build({
    ...baseConfig,
    plugins: [dts()],
});

// Standalone.
await Bun.build({
    ...baseConfig,
    naming: "[dir]/archipelago.min.[ext]",
    minify: true,
});
