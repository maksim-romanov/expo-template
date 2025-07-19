import { container } from "tsyringe";

import { ApiClient } from "../api-client";
import { TOKENS } from "./tokens";

container.register(TOKENS.API_CLIENT, { useClass: ApiClient });
