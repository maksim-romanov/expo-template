import { inject, singleton } from "tsyringe";

import { ExpoUpdateService } from "services/app-update/app-update.service";
import { AuthService } from "services/auth";
import { Logger, LOGGER } from "services/modules/logger";

@singleton()
export class ApplicationService implements Service {
  constructor(
    @inject(AuthService) private readonly authService: AuthService,
    @inject(ExpoUpdateService) private readonly expoUpdate: ExpoUpdateService,

    @inject(LOGGER) public logger: Logger,
  ) {}

  init() {
    this.logger.log(`App init ${this.authService.authStore.isAuthenticated}`);

    this.expoUpdate.checkForUpdate();
  }
}
