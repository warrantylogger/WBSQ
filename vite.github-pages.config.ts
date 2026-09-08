import react from "@vitejs/plugin-react";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { defineConfig } from "vite";
import { brands } from "./app/brands/brand-data";

const outputDirectory = path.resolve(__dirname, "docs");

export default defineConfig({
  base: "/",
  root: path.resolve(__dirname, "github-pages"),
  publicDir: path.resolve(__dirname, "public"),
  plugins: [
    react(),
    {
      name: "github-pages-route-fallbacks",
      async closeBundle() {
        await writeFile(path.join(outputDirectory, ".nojekyll"), "");
        await writeFile(path.join(outputDirectory, "CNAME"), "www.wbsq.com\n");
        await copyFile(
          path.join(outputDirectory, "index.html"),
          path.join(outputDirectory, "404.html"),
        );
        for (const route of ["about", "brands", "contact", "founder"]) {
          const routeDirectory = path.join(outputDirectory, route);
          await mkdir(routeDirectory, { recursive: true });
          await copyFile(
            path.join(outputDirectory, "index.html"),
            path.join(routeDirectory, "index.html"),
          );
        }
        for (const brand of brands) {
          const routeDirectory = path.join(outputDirectory, "brands", brand.slug);
          await mkdir(routeDirectory, { recursive: true });
          await copyFile(
            path.join(outputDirectory, "index.html"),
            path.join(routeDirectory, "index.html"),
          );
        }
      },
    },
  ],
  resolve: {
    alias: {
      "next/image": path.resolve(__dirname, "github-pages/src/NextImage.tsx"),
    },
  },
  build: {
    outDir: outputDirectory,
    emptyOutDir: true,
  },
});
