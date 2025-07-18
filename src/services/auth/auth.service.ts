import { router } from "expo-router";
import { inject, registry, singleton } from "tsyringe";

import { ApiClient } from "services/modules/api-client/api-client";
import { API_AUTH_CLIENT, API_CLIENT } from "services/modules/api-client/tokens";
import { BaseLogger, Logger, LOGGER } from "services/modules/logger";

import { AuthStore } from "./auth.store";

@registry([{ token: LOGGER, useValue: new BaseLogger("AuthService") }])
@singleton()
export class AuthService implements Service {
  constructor(
    @inject(AuthStore) public authStore: AuthStore,
    @inject(API_CLIENT) public apiClient: ApiClient,
    @inject(API_AUTH_CLIENT) public apiAuthClient: ApiClient,
    @inject(LOGGER) public logger: Logger,
  ) {}

  async init() {
    this.apiAuthClient.get("/test");
    this.apiAuthClient.get("/test");
  }

  async login() {
    this.logger.log("login called");
    this.authStore.setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.authStore.setIsLoading(false);
    this.authStore.setIsAuthenticated(true);
    router.replace("/");
  }
}
