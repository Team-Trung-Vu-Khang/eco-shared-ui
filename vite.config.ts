import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: true, // Tự động tạo entry trong package.json (nếu chưa có)
      include: ["src"], // Chỉ quét thư mục src
      entryRoot: "src", // 👈 QUAN TRỌNG: Đặt gốc là src để tránh tạo thư mục lồng nhau
      outDir: "dist", // Xuất ra thư mục dist
      tsconfigPath: "./tsconfig.app.json", // Trỏ đúng file config TS của bạn
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "EcoSharedUI",
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // 👇 THÊM CÁC THƯ VIỆN NÀY VÀO ĐỂ KHÔNG BUNDLE CHÚNG
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "tailwindcss",
        "react-is",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
        },
        // 👇 Ép tên file CSS luôn là index.css
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "index.css";
          }
          return assetInfo.name as string;
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
