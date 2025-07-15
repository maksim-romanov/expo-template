import { createToken } from "utils/di";

export const API_URL = createToken("api:API_URL");

export const API_CLIENT = createToken("api:API_CLIENT");
export const API_AUTH_CLIENT = createToken("api:API_AUTH_CLIENT");

export const REQUEST_TRANSFORMER = createToken("api:REQUEST_TRANSFORMER");
export const RESPONSE_TRANSFORMER = createToken("api:RESPONSE_TRANSFORMER");
export const HEADER_PROVIDER = createToken("api:HEADER_PROVIDER");
export const ERROR_TRANSFORMER = createToken("api:ERROR_TRANSFORMER");
export const URL_BUILDER = createToken("api:URL_BUILDER");
