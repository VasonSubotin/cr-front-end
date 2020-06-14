import { consts } from "config";

import { ServerAPI } from "./api";

export const serverAPI = new ServerAPI(consts.SERVER_URL);
