import { inject, singleton } from "tsyringe";

import { TOKENS } from "modules/container/tokens";

import { AuthStore } from "./auth-store";
import { IAuthRepository } from "../repositories/auth-repository";
import { ITokensRepository } from "../repositories/tokens-repository";

@singleton()
export class AuthService {
  constructor(
    @inject(TOKENS.AUTH_TOKENS_REPOSITORY) public readonly tokens: ITokensRepository,
    @inject(TOKENS.AUTH_REPOSITORY) public readonly authRepository: IAuthRepository,
    @inject(TOKENS.AUTH_STORE) public readonly store: AuthStore,
  ) {}

  async init() {
    await this.tokens.getAccessToken();
    await this.store.hydrate();
  }

  async login(email: string, password: string) {
    const tokens = await this.authRepository.login({ email, password });
    await this.tokens.save(tokens);
    this.store.setIsAuthenticated(true);
  }

  async logout() {
    await this.authRepository.logout();
    await this.tokens.clear();
    this.store.setIsAuthenticated(false);
  }

  async refreshToken() {
    const refreshToken = await this.tokens.getRefreshToken();
    if (!refreshToken) throw new Error("Refresh token not found");

    const tokens = await this.authRepository.refreshToken({ refreshToken });
    await this.tokens.save(tokens);
  }
}
