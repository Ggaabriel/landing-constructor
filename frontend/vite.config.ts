import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
// import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
    plugins: [react()],
    base:"/",
    preview: {
        host: true,
        port: 5173,
    },
    server:{
        host:true,
    },
    // server: { https: true },
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, ".") }],
    },
});
