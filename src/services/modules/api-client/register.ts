import Keys from "react-native-keys";
import { container } from "tsyringe";

import { ApiClient } from "./api-client";
import { HumpsErrorTransformer } from "./error-transformer";
import { ExpoHeaderProvider } from "./header-provider";
import { HumpsRequestTransformer, HumpsResponseTransformer } from "./humps-transformers";
import {
  API_AUTH_CLIENT,
  API_CLIENT,
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
import { NativeUrlBuilder } from "./url-builder";

const childContainer = container.createChildContainer();

childContainer.register<IResponseTransformer>(RESPONSE_TRANSFORMER, { useClass: HumpsResponseTransformer });
childContainer.register<IRequestTransformer>(REQUEST_TRANSFORMER, { useClass: HumpsRequestTransformer });
childContainer.register<IErrorTransformer>(ERROR_TRANSFORMER, { useClass: HumpsErrorTransformer });
childContainer.register<IHeaderProvider>(HEADER_PROVIDER, { useClass: ExpoHeaderProvider });
childContainer.register<IUrlBuilder>(URL_BUILDER, { useClass: NativeUrlBuilder });

childContainer.registerSingleton<IApiClient>(API_CLIENT, ApiClient);
childContainer.registerSingleton<IApiClient>(API_AUTH_CLIENT, ApiClient);

container.register<IApiClient>(API_CLIENT, {
  useFactory: () => {
    childContainer.register<string>(API_URL, { useValue: Keys.API_URL });
    return childContainer.resolve<IApiClient>(API_CLIENT);
  },
});

container.register<IApiClient>(API_AUTH_CLIENT, {
  useFactory: () => {
    childContainer.register<string>(API_URL, { useValue: Keys.AUTH_URL });
    return childContainer.resolve<IApiClient>(API_AUTH_CLIENT);
  },
});
