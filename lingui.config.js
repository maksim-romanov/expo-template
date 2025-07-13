import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["cs", "en"],
  catalogs: [
    {
      path: "<rootDir>/locales/{locale}/app",
      include: ["src/screens", "src/app"],
    },
    {
      path: "<rootDir>/locales/{locale}/components",
      include: ["src/components"],
    },
  ],
});
