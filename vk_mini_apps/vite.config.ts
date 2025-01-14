import tailwindcss from "tailwindcss";
import { join } from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import path from 'path';
import alias from "@rollup/plugin-alias";
// import viteBasicSslPlugin from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  base: "./",

  plugins: [
    svgr({
      include: /\.svg$/,
      svgrOptions: {
        // icon: true,
      },
    }),
    react(),
    // viteBasicSslPlugin(), // ломает vk tunnel
    alias({
      entries: [
        { find: "@", replacement: join(__dirname, "src") },
        // {
        //   find: '@server',
        //   replacement: join(__dirname, '../back/src'),
        // },
      ],
    }),
  ],

  server: {
    port: 5173,
    host: "localhost",
    hmr: {
      protocol: "ws",
      host: "localhost",
    },
  },

  build: {
    rollupOptions: {
      // external: ['zod'],
      output: {
        manualChunks: {
          zod: ["zod"],
          formik: ["formik"],
          cropper: ["cropperjs"],
        },
      },
      onLog: (level, log, handler) => {
        // скрыть сообщения о use-client в либах @vkontakte при билде
        if (
          level === "warn" &&
          log.message.includes("use-client") &&
          log.message.includes("@vkontakte") &&
          log.message.includes("was ignored")
        ) {
          return;
        } else {
          handler(level, log);
        }
      },
    },
  },
});
