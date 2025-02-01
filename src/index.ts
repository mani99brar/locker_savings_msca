import * as dotenv from "dotenv";
dotenv.config();
import { modularAccountClient } from "./client";
import { savingsPluginActions } from "./plugin-gens/savings/plugin";

/**
 * @description Extends the client with a plugin
 */
export async function main() {
  const extendedAccount = modularAccountClient.extend(savingsPluginActions);

  const res = await extendedAccount.createAutomation({
    args: [
      BigInt(0),
      "0xFa00D29d378EDC57AA1006946F0fc6230a5E3288",
      BigInt(1000000),
    ],
  });
  console.log(res);
}

main();
