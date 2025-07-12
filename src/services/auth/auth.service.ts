import { router } from "expo-router";
import { inject, injectable } from "tsyringe";

import { AuthStore } from "./auth.store";
import { AUTH_STORE } from "./tokens";

@injectable()
export class AuthService {
  constructor(@inject(AUTH_STORE) public authStore: AuthStore) {}

  async login() {
    this.authStore.setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.authStore.setIsLoading(false);
    this.authStore.setIsAuthenticated(true);
    router.replace("/");
  }
}
