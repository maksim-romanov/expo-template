export interface IRequestTransformer {
  transformRequest(data: unknown): any;
}

export interface IResponseTransformer {
  transformResponse(data: unknown): any;
}

export interface IErrorTransformer {
  transformError(data: unknown): Promise<void>;
}

export interface IHeaderProvider {
  getHeaders(extra?: Record<string, string>): Promise<Record<string, string>> | Record<string, string>;
}

export interface IApiClient {
  head(path: string, params?: Record<string, any>): Promise<void>;
  get<T = any>(path: string, params?: { body?: Record<string, any>; headers?: Record<string, string> }): Promise<T>;
  post<T = any>(path: string, params?: { body?: Record<string, any>; headers?: Record<string, string> }): Promise<T>;
  del<T = any>(path: string): Promise<T>;
}

export interface IUrlBuilder {
  getUrl(url: string, path: string): string;
  getUrlWithParams(url: string, path: string, params: Record<string, string>): string;
}
