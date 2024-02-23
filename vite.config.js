import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// https://www.npmjs.com/package/vite-plugin-restart
import ViteRestart from "vite-plugin-restart";

// defaults, local DDEV (with ddev-router)
const port = 5173;
const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`;

// for debugging:
// console.log(process.env);

console.log("Local DDEV detected", {
    port,
    origin,
});

export default defineConfig(({ command }) => ({
    // 'vite' is always command = 'serve', other command is 'build'
    base: command === "serve" ? "" : "/dist/",
    build: {
        manifest: true,
        outDir: "web/dist/",
        rollupOptions: {
            input: {
                app: "./src/js/app.ts",
            },
        },
    },
    // adjustments for ddev:
    server: {
        // respond to all network requests:
        host: "0.0.0.0",
        port: port,
        strictPort: true,
        // origin is important, see https://nystudio107.com/docs/vite/#vite-processed-assets
        origin: origin,
    },
    plugins: [
        tsconfigPaths(),
        ViteRestart({
            restart: ["./templates/**/*"],
        }),
    ],
}));
