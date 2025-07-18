import { inject, injectable } from "tsyringe";

import {
  API_URL,
  ERROR_TRANSFORMER,
  HEADER_PROVIDER,
  REQUEST_TRANSFORMER,
  RESPONSE_TRANSFORMER,
  URL_BUILDER,
} from "./tokens";
import {
  IApiClient,
  IErrorTransformer,
  IHeaderProvider,
  IRequestTransformer,
  IResponseTransformer,
  IUrlBuilder,
} from "./types";

@injectable()
export class ApiClient implements IApiClient {
  constructor(
    @inject(API_URL) private readonly apiUrl: string,
    @inject(URL_BUILDER) private readonly urlBuilder: IUrlBuilder,
    @inject(HEADER_PROVIDER) private readonly headerProvider: IHeaderProvider,
    @inject(REQUEST_TRANSFORMER) private readonly reqTf: IRequestTransformer,
    @inject(RESPONSE_TRANSFORMER) private readonly resTf: IResponseTransformer,
    @inject(ERROR_TRANSFORMER) private readonly errTf: IErrorTransformer,
  ) {}

  async get<T>(path: string, params: Parameters<IApiClient["get"]>[1] = {}): Promise<T> {
    const url = this.urlBuilder.getUrlWithParams(this.apiUrl, path, params.body ?? {});
    const headers = await this.buildHeaders(params.headers);
    const res = await fetch(url, { method: "GET", headers });
    return this.handleResponse(res);
  }

  async post<T>(path: string, params: Parameters<IApiClient["post"]>[1] = {}): Promise<T> {
    const url = this.urlBuilder.getUrl(this.apiUrl, path);
    const payload = params.body != null ? JSON.stringify(this.reqTf.transformRequest(params.body)) : undefined;
    const headers = await this.buildHeaders(params.headers);
    const res = await fetch(url, { method: "POST", headers, body: payload });
    return this.handleResponse(res);
  }

  async del<T>(path: string, body?: any): Promise<T> {
    const url = this.urlBuilder.getUrl(this.apiUrl, path);
    const payload = body != null ? JSON.stringify(this.reqTf.transformRequest(body)) : undefined;
    const headers = await this.buildHeaders();
    const res = await fetch(url, { method: "DELETE", headers, body: payload });
    return this.handleResponse(res);
  }

  async head(path: string, params: Parameters<IApiClient["head"]>[1] = {}): Promise<void> {
    const url = this.urlBuilder.getUrlWithParams(this.apiUrl, path, params);
    const headers = await this.buildHeaders(params);
    const res = await fetch(url, { method: "HEAD", headers });
    return this.handleResponse(res);
  }

  private async buildHeaders(extra: Record<string, string> = {}) {
    const headers = await this.headerProvider.getHeaders(extra);
    return { ...headers };
  }

  private async handleResponse(res: Response) {
    if (!res.ok) await this.errTf.transformError(res);

    try {
      const json = await res.json();
      return this.resTf.transformResponse(json);
    } catch {
      return null;
    }
  }
}
