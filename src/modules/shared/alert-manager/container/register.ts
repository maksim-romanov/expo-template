import { container } from "tsyringe";

import { ReactNativeAlertManager } from "../alert-manager";
import { TOKENS } from "./tokens";

container.register(TOKENS.ALERT_MANAGER, { useClass: ReactNativeAlertManager });
