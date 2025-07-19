import { container } from "tsyringe";

import { TOKENS } from "./tokens";
import { AppService } from "../services/app-service";
import { BootstrapAppUseCase } from "../usecases/bootstrap-app";

container.register(TOKENS.APP_SERVICE, { useClass: AppService });
container.register(TOKENS.BOOTSTRAP_APP_USE_CASE, { useClass: BootstrapAppUseCase });
