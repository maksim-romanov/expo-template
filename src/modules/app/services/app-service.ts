import { inject, singleton } from "tsyringe";

import { AuthService } from "modules/auth/services/auth-service";
import { TOKENS } from "modules/container/tokens";

@singleton()
export class AppService implements Service {
  constructor(@inject(TOKENS.AUTH_SERVICE) private readonly authService: AuthService) {}

  async init() {
    await this.authService.init();
  }
}
