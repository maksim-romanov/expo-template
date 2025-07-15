import humps from "humps";
import { injectable } from "tsyringe";

import { APIError } from "types/models/api-error";

import type { IErrorTransformer } from "./types";

function transformError(error: [string, string]): { [key: string]: string } {
  const [field, message] = error;
  return { [field]: message };
}

@injectable()
export class HumpsErrorTransformer implements IErrorTransformer {
  async transformError(response: any) {
    const errorRes = humps.camelizeKeys(await response.json().catch(() => ({})));
    let fieldError = {};
    if (errorRes.fieldError) fieldError = transformError(errorRes.fieldError);

    throw new APIError({ status: response.status, message: errorRes.error, field: fieldError });
  }
}
