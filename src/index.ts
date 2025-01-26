import * as dotenv from "dotenv";
dotenv.config();
import { modularAccountClient } from "./client";
import { simpleCounterPluginActions } from "./plugin-gens/simple-counter/plugin";

/**
 * @description Extends the client with a plugin
 */
export async function main() {
  const extendedAccount = modularAccountClient.extend(
    simpleCounterPluginActions
  );
  const res = await extendedAccount.installSimpleCounterPlugin({ args: [] });
  console.log(res);
}

main();
