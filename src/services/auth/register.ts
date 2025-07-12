import { container } from "tsyringe";

import { AuthService } from "./auth.service";
import { AuthStore } from "./auth.store";
import { AUTH_SERVICE, AUTH_STORE } from "./tokens";

const child = container.createChildContainer();

child.registerSingleton<AuthStore>(AUTH_STORE, AuthStore);

container.register<AuthService>(AUTH_SERVICE, {
  useFactory: () => child.resolve(AuthService),
});
