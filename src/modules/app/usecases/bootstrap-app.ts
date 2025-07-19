import { inject, singleton } from "tsyringe";

import { AuthService } from "modules/auth/services/auth-service";
import { TOKENS } from "modules/container/tokens";
import { IApiClient } from "modules/shared/api-client/api-client";

import { AppService } from "../services/app-service";
import { SplashScreenService } from "../services/splash-screen";

@singleton()
export class BootstrapAppUseCase implements UseCase {
  constructor(
    @inject(TOKENS.APP_SERVICE) private readonly appService: AppService,
    @inject(TOKENS.AUTH_SERVICE) private readonly authService: AuthService,
    @inject(TOKENS.SPLASH_SCREEN_SERVICE) private readonly splashScreenService: SplashScreenService,

    @inject(TOKENS.API_CLIENT) private readonly apiClient: IApiClient,
  ) {}

  async execute() {
    await this.appService.init();
    const isAuthenticated = this.authService.store.isAuthenticated;

    console.log("isAuthenticated", isAuthenticated);

    await this.splashScreenService.hide();

    try {
      await this.apiClient.request("/api/v1/auth/me", { method: "GET" });
    } catch (error) {
      console.log("error", error);
    }
  }
}
