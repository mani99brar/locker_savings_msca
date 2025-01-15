import * as dotenv from "dotenv";
dotenv.config();

import { modularAccountClient } from "./client";
import { counterPluginActions } from "../plugin-gens/counter-config/counter/plugin";

/**
 * @description Extends the client with the savings plugin
 */
export async function main() {
  const savingsAccount = modularAccountClient.extend(counterPluginActions);
  console.log(await savingsAccount.getInstalledPlugins({}));
  const res = await savingsAccount.installCounterPlugin({
    args: [],
  });
  console.log(res);
  // // Fund the savings account on entry point
  // const { hash } = await savingsAccount.installSavingsPlugin({ args: [] });
  // console.log("Transaction hash: ", hash);
  // await savingsAccount.waitForUserOperationTransaction({ hash });
}

main();
