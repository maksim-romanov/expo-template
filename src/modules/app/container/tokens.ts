import { createToken } from "utils/di";

export const TOKENS = {
  SPLASH_SCREEN_SERVICE: createToken("module:SPLASH_SCREEN_SERVICE"),
  BOOTSTRAP_APP_USE_CASE: createToken("module:BOOTSTRAP_APP_USE_CASE"),
  APP_SERVICE: createToken("module:APP_SERVICE"),
};
