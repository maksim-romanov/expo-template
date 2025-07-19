import { FetchContext, ofetch } from "ofetch";
import Keys from "react-native-keys";
import { inject, injectable } from "tsyringe";

import { TOKENS } from "modules/container/tokens";
import { BaseApiClient, type IApiClient } from "modules/shared/api-client/api-client";

import { ITokensRepository } from "../repositories/tokens-repository";

@injectable()
export class AuthApiClient extends BaseApiClient implements IApiClient {
  constructor(@inject(TOKENS.AUTH_TOKENS_REPOSITORY) private readonly tokensRepository: ITokensRepository) {
    super();
  }

  private fetcher = ofetch.create({
    baseURL: Keys.AUTH_URL,
    onRequest: [
      (ctx) => this.addDeviceHeaders(ctx),
      (ctx) => this.addAuthHeaders(ctx),
      (ctx) => this.transformRequestData(ctx),
    ],
    onResponse: [(ctx) => this.transformResponseData(ctx)],
  });

  request<T>(url: string, options: RequestInit): Promise<T> {
    return this.fetcher<T>(url, options);
  }

  private async addAuthHeaders(ctx: FetchContext) {
    const accessToken = await this.tokensRepository.getAccessToken();
    if (accessToken) ctx.options.headers.append("Authorization", `Bearer ${accessToken}`);
  }
}
