import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const buildConfig =
    env.VITE_BUILD_MODE === "component"
      ? {
          rollupOptions: {
            external: ["vue"],
            output: {
              globals: {
                vue: "Vue",
              },
            },
          },
          lib: {
            entry: resolve(__dirname, "packages/vue-zoom-container/index.ts"),
            name: "vue-zoom-container",
          },
        }
      : env.VITE_BUILD_MODE === "example"
      ? {
          rollupOptions: {
            input: {
              main: resolve(__dirname, "index.html"),
            },
          },
        }
      : {};
  return defineConfig({
    plugins: [vue()],
    base: "./",
    server: {
      host: "0.0.0.0",
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./examples", import.meta.url)),
      },
    },
    build: buildConfig,
  });
};
