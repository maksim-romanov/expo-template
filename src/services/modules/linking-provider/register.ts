import { container } from "tsyringe";

import { ExpoLinkingProvider, ILinkingProvider } from "./linking-provider";
import { LINKING_PROVIDER } from "./tokens";

container.register<ILinkingProvider>(LINKING_PROVIDER, {
  useClass: ExpoLinkingProvider,
});

export { ExpoLinkingProvider };
