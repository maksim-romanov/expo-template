import { container } from "tsyringe";

import { TOKENS } from "./tokens";
import { AppService } from "../services/app-service";
import { SplashScreenService } from "../services/splash-screen";
import { BootstrapAppUseCase } from "../usecases/bootstrap-app";

container.register(TOKENS.SPLASH_SCREEN_SERVICE, { useClass: SplashScreenService });
container.register(TOKENS.APP_SERVICE, { useClass: AppService });

container.register(TOKENS.BOOTSTRAP_APP_USE_CASE, { useClass: BootstrapAppUseCase });
