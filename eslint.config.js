// https://docs.expo.dev/guides/using-eslint/
const cspellConfigs = require("@cspell/eslint-plugin/configs");
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const importPlugin = require("eslint-plugin-import");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  importPlugin.flatConfigs["react-native"],
  cspellConfigs.recommended,
  {
    ignores: ["dist/*", ".expo/*", "node_modules/*"],
  },
  {
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling"]],
          pathGroups: [{ pattern: "react", group: "builtin", position: "before" }],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "prettier/prettier": ["error", { printWidth: 120 }],
    },
  },
]);
