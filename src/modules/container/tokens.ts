import { TOKENS as appTokens } from "modules/app/container/tokens";
import { TOKENS as authTokens } from "modules/auth/container/tokens";
import { TOKENS as alertManagerTokens } from "modules/shared/alert-manager/container/tokens";
import { TOKENS as apiClientTokens } from "modules/shared/api-client/container/tokens";
import { TOKENS as linkingManagerTokens } from "modules/shared/linking-manager/container/tokens";
import { TOKENS as splashScreenTokens } from "modules/shared/splash-screen/container/tokens";

export const TOKENS = {
  ...authTokens,
  ...apiClientTokens,
  ...appTokens,
  ...splashScreenTokens,
  ...linkingManagerTokens,
  ...alertManagerTokens,
};
