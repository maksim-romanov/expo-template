import { inject, injectable } from "tsyringe";

import { REQUEST_TRANSFORMER } from "./tokens";
import { IRequestTransformer, IUrlBuilder } from "./types";

@injectable()
export class NativeUrlBuilder implements IUrlBuilder {
  constructor(@inject(REQUEST_TRANSFORMER) private readonly reqTf: IRequestTransformer) {}

  getUrl(baseUrl: string, path: string): string {
    const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const url = new URL(`${normalizedBaseUrl}${normalizedPath}`);
    return url.toString();
  }

  getUrlWithParams(baseUrl: string, path: string, params: Record<string, string>): string {
    const url = new URL(this.getUrl(baseUrl, path));
    const dec = this.reqTf.transformRequest(params);

    Object.entries(dec).forEach(([k, v]) => {
      if (v != null) url.searchParams.append(k, String(v));
    });

    return url.toString();
  }
}
