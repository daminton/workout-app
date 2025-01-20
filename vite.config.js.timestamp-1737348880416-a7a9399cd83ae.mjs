// vite.config.js
import { defineConfig } from "file:///D:/code/workout-app/node_modules/vite/dist/node/index.js";
import react from "file:///D:/code/workout-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///D:/code/workout-app/node_modules/vite-plugin-pwa/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "D:\\code\\workout-app";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@store": path.resolve(__vite_injected_original_dirname, "./src/store/useAppStore.js")
    }
  },
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
            src: "public/dumbbell.png",
            // Ensure the path matches your PNG
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "public/dumbbell.png",
            // Ensure the path matches your PNG
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "public/dumbbell.png",
            // Additional size for Android
            sizes: "256x256",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "public/dumbbell.png",
            // Additional size for Android
            sizes: "384x384",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      registerType: "autoUpdate"
    })
  ],
  base: "/workout-app/"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXHdvcmtvdXQtYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjb2RlXFxcXHdvcmtvdXQtYXBwXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RlL3dvcmtvdXQtYXBwL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgICAgXCJAc3RvcmVcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9zdG9yZS91c2VBcHBTdG9yZS5qc1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgVml0ZVBXQSh7XHJcbiAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgbmFtZTogXCJXb3Jrb3V0IEFwcFwiLFxyXG4gICAgICAgIHNob3J0X25hbWU6IFwiV29ya291dEFwcFwiLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkEgcHJvZ3Jlc3NpdmUgd2ViIGFwcGxpY2F0aW9uIGZvciBtYW5hZ2luZyB3b3Jrb3V0c1wiLFxyXG4gICAgICAgIHN0YXJ0X3VybDogXCIvd29ya291dC1hcHAvXCIsXHJcbiAgICAgICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjRkZGRkZGXCIsXHJcbiAgICAgICAgdGhlbWVfY29sb3I6IFwiI0E5QTlBOVwiLFxyXG4gICAgICAgIGljb25zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogXCJwdWJsaWMvZHVtYmJlbGwucG5nXCIsIC8vIEVuc3VyZSB0aGUgcGF0aCBtYXRjaGVzIHlvdXIgUE5HXHJcbiAgICAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcclxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgICAgcHVycG9zZTogXCJhbnkgbWFza2FibGVcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogXCJwdWJsaWMvZHVtYmJlbGwucG5nXCIsIC8vIEVuc3VyZSB0aGUgcGF0aCBtYXRjaGVzIHlvdXIgUE5HXHJcbiAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcclxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgICAgcHVycG9zZTogXCJhbnkgbWFza2FibGVcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogXCJwdWJsaWMvZHVtYmJlbGwucG5nXCIsIC8vIEFkZGl0aW9uYWwgc2l6ZSBmb3IgQW5kcm9pZFxyXG4gICAgICAgICAgICBzaXplczogXCIyNTZ4MjU2XCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgIHB1cnBvc2U6IFwiYW55IG1hc2thYmxlXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IFwicHVibGljL2R1bWJiZWxsLnBuZ1wiLCAvLyBBZGRpdGlvbmFsIHNpemUgZm9yIEFuZHJvaWRcclxuICAgICAgICAgICAgc2l6ZXM6IFwiMzg0eDM4NFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgICBwdXJwb3NlOiBcImFueSBtYXNrYWJsZVwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBiYXNlOiBcIi93b3Jrb3V0LWFwcC9cIixcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVAsU0FBUyxvQkFBb0I7QUFDOVEsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3BDLFVBQVUsS0FBSyxRQUFRLGtDQUFXLDRCQUE0QjtBQUFBLElBQ2hFO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsV0FBVztBQUFBLFFBQ1gsU0FBUztBQUFBLFFBQ1Qsa0JBQWtCO0FBQUEsUUFDbEIsYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQTtBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUE7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQTtBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsY0FBYztBQUFBLElBQ2hCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxNQUFNO0FBQ1IsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
