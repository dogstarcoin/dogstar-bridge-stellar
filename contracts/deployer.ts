import * as Client from "../packages/deployer/dist/index.js";
import { rpcUrl } from "./util.ts";

export default new Client.Client({
  ...Client.networks.standalone,
  rpcUrl,
  allowHttp: true,
  publicKey: undefined,
});
