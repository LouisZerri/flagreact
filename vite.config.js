import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        // En dev, on proxifie les appels /api vers json-server (port 3003)
        // afin d'utiliser la même URL relative qu'en production.
        proxy: {
            "/api": {
                target: "http://localhost:3003",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
