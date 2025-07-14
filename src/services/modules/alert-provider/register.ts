import { container } from "tsyringe";

import { IAlertProvider, ReactNativeAlertProvider } from "./alert-provider";
import { ALERT_PROVIDER } from "./tokens";

container.register<IAlertProvider>(ALERT_PROVIDER, { useClass: ReactNativeAlertProvider });
