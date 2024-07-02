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
            src: "public/dumbbell_white.png", // Ensure the path matches your PNG
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "public/dumbbell_white.png", // Ensure the path matches your PNG
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "public/dumbbell_white.png", // Additional size for Android
            sizes: "256x256",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "public/dumbbell_white.png", // Additional size for Android
            sizes: "384x384",
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
