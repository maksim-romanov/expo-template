import { inject, singleton } from "tsyringe";

import { type IApiClient } from "modules/shared/api-client/api-client";

import { TOKENS } from "../container/tokens";
import { LoginRequestDto, LoginResponseDto, RefreshTokenRequestDto, RefreshTokenResponseDto } from "../dto";

export interface IAuthRepository {
  login(request: LoginRequestDto): Promise<LoginResponseDto>;
  logout(): Promise<void>;
  refreshToken(request: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto>;
}

@singleton()
export class AuthRepository implements IAuthRepository {
  constructor(@inject(TOKENS.AUTH_API_CLIENT) private apiAuthClient: IApiClient) {}

  async login(request: LoginRequestDto): Promise<LoginResponseDto> {
    // throw new Error("Method not implemented.");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };
  }

  async logout(): Promise<void> {
    try {
      await this.apiAuthClient.request("/logout", { method: "POST" });
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  refreshToken(request: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> {
    throw new Error("Method not implemented.");
  }
}
