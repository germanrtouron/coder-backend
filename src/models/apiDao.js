import { getApiDao } from "./index.js";
import { options } from "../config/config.js";

const apiDao = await getApiDao(options.server.DB_TYPE);

export { apiDao };
