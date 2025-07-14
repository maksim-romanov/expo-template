import { parseArgs } from "util";

import { EPlatforms, EProfiles } from "../shared/types";

const { values } = parseArgs({
  args: Bun.argv,
  strict: false,
  allowPositionals: true,
  options: {
    platform: { type: "string", default: EPlatforms.ios, short: "p" },
    profile: { type: "string", default: EProfiles.development },
  },
});

const platform = values.platform as EPlatforms;
const profile = values.profile as EProfiles;

if (!platform || !(platform in EPlatforms)) throw new Error(`Invalid platform: ${platform}`);
if (!profile || !(profile in EProfiles)) throw new Error(`Invalid profile: ${profile}`);

const keyFile = `keys/keys.${profile}.json`;
const restArgs = Bun.argv.slice(2).filter((arg) => !/(platform|profile)/.test(arg));

Bun.spawn(["bun", "expo", `run:${platform}`, ...restArgs], {
  stdout: "inherit",
  stdin: "inherit",
  env: { ...process.env, KEYSFILE: keyFile },
});
