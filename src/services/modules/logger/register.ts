import { container } from "tsyringe";

import { BaseLogger } from "./logger";
import { LOGGER } from "./tokens";

container.register(LOGGER, { useValue: new BaseLogger("DefaultLogger") });
