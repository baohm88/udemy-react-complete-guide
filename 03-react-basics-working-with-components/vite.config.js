import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Đặt trình duyệt mặc định mở là Google Chrome (trên macOS)
process.env.BROWSER = "google chrome";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
