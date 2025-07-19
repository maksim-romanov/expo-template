import { container } from "tsyringe";

import { TOKENS } from "./tokens";
import { AuthRepository } from "../repositories/auth-repository";
import { SecureTokensRepository } from "../repositories/tokens-repository";
import { AuthApiClient } from "../services/api-client";
import { AuthService } from "../services/auth-service";
import { AuthStore } from "../services/auth-store";

container.register(TOKENS.AUTH_SERVICE, {
  useFactory: (childContainer) => {
    childContainer.register(TOKENS.AUTH_TOKENS_REPOSITORY, { useClass: SecureTokensRepository });

    childContainer.register(TOKENS.AUTH_API_CLIENT, { useClass: AuthApiClient });
    childContainer.register(TOKENS.AUTH_REPOSITORY, { useClass: AuthRepository });

    childContainer.register(TOKENS.AUTH_STORE, { useClass: AuthStore });

    return childContainer.resolve(AuthService);
  },
});
