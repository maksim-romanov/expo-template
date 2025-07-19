import { container } from "tsyringe";

import { ExpoLinkingManager } from "../linking-manager";
import { TOKENS } from "./tokens";

container.register(TOKENS.LINKING_MANAGER, { useClass: ExpoLinkingManager });
