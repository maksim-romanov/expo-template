import { camelizeKeys, decamelizeKeys } from "humps";
import { FetchContext, ofetch } from "ofetch";
import { Platform } from "react-native";
import Keys from "react-native-keys";
import { inject, injectable, singleton } from "tsyringe";

import { TOKENS } from "modules/auth/container/tokens";
import { AuthService } from "modules/auth/services/auth-service";
export interface IApiClient {
  request<T>(url: string, options: RequestInit): Promise<T>;
}

export abstract class BaseApiClient {
  protected transformRequestData(ctx: FetchContext) {
    if (ctx.options.body && typeof ctx.options.body === "object") {
      ctx.options.body = decamelizeKeys(ctx.options.body);
    }
  }

  protected transformResponseData(ctx: FetchContext) {
    if (ctx.response && ctx.response._data && typeof ctx.response._data === "object") {
      ctx.response._data = camelizeKeys(ctx.response._data);
    }
  }

  protected async addDeviceHeaders(ctx: FetchContext) {
    ctx.options.headers.append("x-dev-mode", "true");
    ctx.options.headers.append("x-platform-os", Platform.OS);
    ctx.options.headers.append("x-platform-version", Platform.Version.toString());
  }
}

@injectable()
export class ApiClient extends BaseApiClient {
  constructor(@inject(TOKENS.AUTH_SERVICE) private readonly authService: AuthService) {
    super();
  }

  private fetcher = ofetch.create({
    baseURL: Keys.API_URL,
    headers: { "Content-Type": "application/json" },
    onRequest: [
      (ctx) => this.addDeviceHeaders(ctx),
      (ctx) => this.addAuthHeaders(ctx),
      (ctx) => this.transformRequestData(ctx),
    ],
    onResponse: [(ctx) => this.transformResponseData(ctx)],
    onResponseError: [(ctx) => this.handleRefreshToken(ctx), (ctx) => this.handleLogout(ctx)],
  });

  request<T>(url: string, options: RequestInit): Promise<T> {
    return this.fetcher<T>(url, options);
  }

  private async addAuthHeaders(ctx: FetchContext) {
    const accessToken = await this.authService.tokens.getAccessToken();
    if (accessToken) ctx.options.headers.append("Authorization", `Bearer ${accessToken}`);
  }

  private async handleRefreshToken(ctx: FetchContext) {
    const { request, options, response } = ctx;
    if (response?.status === 401 && !options.retry) {
      await this.authService.refreshToken();
      const response = await this.fetcher(request, options);
      ctx.response = response;
    }
  }

  private async handleLogout(ctx: FetchContext) {
    const { response, options } = ctx;
    if (response?.status === 401 && options.retry) {
      try {
        await this.authService.logout();
      } catch (logoutError) {
        console.error("Failed to logout after refresh error:", logoutError);
      }
    }
  }
}
