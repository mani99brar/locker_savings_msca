import * as dotenv from "dotenv";
dotenv.config();
import { modularAccountClient } from "./client";
import { customSessionKeyPluginActions } from "./plugin-gens/custom-session-key/plugin";
import { CustomSessionKeyPluginAddress } from "@deployments/CustomSessionKeyDeployments.json";

const SAVINGS_PLUGIN_ADDRESS = "0x96BEFBae4867f7E8b0257d905E0E97f132b99DfC";
/**
 * @description Extends the client with a plugin
 */
export async function main() {
  const args = process.argv.slice(2);
  const extendedAccount = modularAccountClient.extend(
    customSessionKeyPluginActions
  );

  if (args.includes("install")) {
    const res = await extendedAccount.installCustomSessionKeyPlugin({
      args: [[], [], []],
    });
    console.log("Plugin installed with ", res.hash);
  } else if (args.includes("uninstall")) {
    const res = await extendedAccount.uninstallPlugin({
      pluginAddress: CustomSessionKeyPluginAddress as `0x${string}`,
    });
    console.log("Plugin uninstalled with", res.hash);
  }

  console.log(
    "Installed Plugins:",
    await extendedAccount.getInstalledPlugins({})
  );
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

async function uninstallPlugin(address: string, extendAccount: any) {
  console.log("Uninstalling the plugin...");
  const res = await extendAccount.uninstallPlugin({
    args: [address],
  });
  console.log("Plugin uninstalled:", res);
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
