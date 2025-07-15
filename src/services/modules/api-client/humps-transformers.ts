import { camelizeKeys, decamelizeKeys } from "humps";
import { injectable } from "tsyringe";

import type { IRequestTransformer, IResponseTransformer } from "./types";

@injectable()
export class HumpsRequestTransformer implements IRequestTransformer {
  transformRequest(data: any): any {
    return decamelizeKeys(data);
  }
}

@injectable()
export class HumpsResponseTransformer implements IResponseTransformer {
  transformResponse(data: any): any {
    return camelizeKeys(data);
  }
}
