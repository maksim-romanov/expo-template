import { inject, singleton } from "tsyringe";

import { type AuthService } from "modules/auth/services/auth-service";
import { TOKENS } from "modules/container/tokens";
import { type SplashScreen } from "modules/shared/splash-screen/splash-screen";

import { type AppService } from "../services/app-service";

@singleton()
export class BootstrapAppUseCase implements UseCase {
  constructor(
    @inject(TOKENS.APP_SERVICE) private readonly appService: AppService,
    @inject(TOKENS.AUTH_SERVICE) private readonly authService: AuthService,
    @inject(TOKENS.SPLASH_SCREEN) private readonly splashScreen: SplashScreen,
  ) {}

  async execute() {
    await this.appService.init();
    const isAuthenticated = this.authService.store.isAuthenticated;

    if (isAuthenticated) console.log("prefetch here");

    await this.splashScreen.hide();
  }
}
