import { options } from "./config.js";

let clusterState = "disabled";

if (options.server.NODE_ENV === "PROD") {
  clusterState = "enabled";
}

export { clusterState };
