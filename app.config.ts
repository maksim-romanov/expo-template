import "tsx/cjs"; // eas build

import { ConfigContext, ExpoConfig } from "expo/config";

import packageJson from "./package.json";

export default ({ config }: ConfigContext): ExpoConfig => {
  const name = config.name;
  const slug = config.slug;

  if (!name || !slug) throw new Error("Name and slug are required");

  return {
    ...config,
    name,
    slug,

    version: (packageJson.version.match(/\d+\.\d+\.\d+/) || [])[0],
  };
};
