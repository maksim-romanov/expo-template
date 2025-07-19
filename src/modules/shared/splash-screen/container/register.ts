import { container } from "tsyringe";

import { SplashScreen } from "../splash-screen";
import { TOKENS } from "./tokens";

container.register(TOKENS.SPLASH_SCREEN, { useClass: SplashScreen });
