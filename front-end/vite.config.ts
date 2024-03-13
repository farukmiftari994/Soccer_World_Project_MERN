import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  manifest: {
    name: "Soccer World Mern App",
    short_name: "SW MERN",
    description:
      "This app was created during live demos of MERN stack technologies.",
    icons: [
      {
        src: "assets/maskable_icon_x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "assets/maskable_icon_x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#000000",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
});
