import { inject, singleton } from "tsyringe";

import { ExpoUpdateService, StoreUpdateService } from "services/app-update/app-update.service";
import { AuthService } from "services/auth";
import { Logger, LOGGER } from "services/modules/logger";

@singleton()
export class ApplicationService implements Service {
  constructor(
    @inject(AuthService) private readonly authService: AuthService,
    @inject(ExpoUpdateService) private readonly expoUpdate: ExpoUpdateService,
    @inject(StoreUpdateService) private readonly storeUpdate: StoreUpdateService,

    @inject(LOGGER) public logger: Logger,
  ) {}

  async init() {
    this.logger.log(`App init ${this.authService.authStore.isAuthenticated}`);

    if (await this.storeUpdate.checkForUpdate()) return;
    await this.expoUpdate.checkForUpdate();
  }
}
