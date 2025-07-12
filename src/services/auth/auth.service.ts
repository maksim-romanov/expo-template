import { router } from "expo-router";
import { inject, registry, singleton } from "tsyringe";

import { BaseLogger, Logger, LOGGER } from "services/modules/logger";

import { AuthStore } from "./auth.store";

@registry([{ token: LOGGER, useValue: new BaseLogger("AuthService") }])
@singleton()
export class AuthService {
  constructor(
    @inject(AuthStore) public authStore: AuthStore,
    @inject(LOGGER) public logger: Logger,
  ) {}

  async login() {
    this.logger.log("login called");
    this.authStore.setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.authStore.setIsLoading(false);
    this.authStore.setIsAuthenticated(true);
    router.replace("/");
  }
}
