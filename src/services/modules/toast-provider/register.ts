import { container } from "tsyringe";

import { BurntToastProvider, IToastProvider } from "./toast-provider";
import { TOAST_PROVIDER } from "./tokens";

container.register<IToastProvider>(TOAST_PROVIDER, { useClass: BurntToastProvider });
