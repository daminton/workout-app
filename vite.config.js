import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Workout App",
        short_name: "WorkoutApp",
        description: "A progressive web application for managing workouts",
        start_url: "/workout-app/",
        display: "standalone",
        background_color: "#FFFFFF",
        theme_color: "#A9A9A9",
        icons: [
          {
            src: "public/dumbell.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "public/dumbell.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      registerType: "autoUpdate",
    }),
  ],
  base: "/workout-app/",
});
