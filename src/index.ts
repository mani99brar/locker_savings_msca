import * as dotenv from "dotenv";
dotenv.config();
import { modularAccountClient } from "./client";
import { savingsPluginActions } from "./plugin-gens/savings/plugin";

const SAVINGS_PLUGIN_ADDRESS = "0x96BEFBae4867f7E8b0257d905E0E97f132b99DfC";
/**
 * @description Extends the client with a plugin
 */
export async function main() {
  const args = process.argv.slice(2);
  const extendedAccount = modularAccountClient.extend(savingsPluginActions);
  if (args.includes("install")) {
    await installSavingsPlugin(extendedAccount);
  } else {
    await createAutomation(extendedAccount);
  }
  return;
}

async function installSavingsPlugin(extendedAccount: any) {
  console.log("Installing the savings plugin...");
  const res = await extendedAccount.installSavingsPlugin({
    args: [],
  });
  console.log("Plugin installed:", res);
  return;
}

async function createAutomation(extendedAccount: any) {
  const installedPlugins = await extendedAccount.getInstalledPlugins({});
  if (!installedPlugins.includes(SAVINGS_PLUGIN_ADDRESS)) {
    console.error(
      "Savings plugin not installed. Run 'yarn start install' to install it."
    );
    return;
  }
  console.log("Creating automation...");
  const res = await extendedAccount.createAutomation({
    args: [
      BigInt(0),
      "0xFa00D29d378EDC57AA1006946F0fc6230a5E3288",
      BigInt(1000000),
    ],
  });
  console.log("Automation created:", res);
  return;
}
main();
