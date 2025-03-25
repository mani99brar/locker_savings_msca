import * as dotenv from "dotenv";
dotenv.config();

import { modularAccountClient } from "../client";
import { splitPluginActions } from "../plugin-gens/split/plugin";
import {
  installSplitPlugin,
  uninstallSavingsPlugin,
  createSplit,
  pauseAutomation,
  split,
  type SplitAutomationArgs,
} from "../utils/splitPluginHelpers";
import { sendTokens } from "../utils/tokenHelpers";
export async function main() {
  const args = process.argv.slice(2);
  const extendedAccount = modularAccountClient.extend(splitPluginActions);

  switch (args[0]) {
    case "install":
      await installSplitPlugin(extendedAccount);
      break;

    case "uninstall":
      await uninstallSavingsPlugin(extendedAccount);
      break;

    case "create":
      const splitArgs: SplitAutomationArgs = {
        tokenAddress: "0x370031b9A06F0A1330034D06d47E2eBb827747Db",
        receiverAddresses: [
          "0x33dbD61Eee31551073D9F81cEd96eb924D6f10F7",
          "0xFa00D29d378EDC57AA1006946F0fc6230a5E3288",
        ],
        percentage: [60, 40],
      };
      await createSplit(extendedAccount, splitArgs);
      break;

    case "pause":
      await pauseAutomation(extendedAccount, 0);
      break;

    case "split":
      const configIndex = 0;
      await split(extendedAccount, configIndex);
      break;

    case "send":
      const AMOUNT = BigInt(1500000);
      const TOKEN_ADDRESS =
        "0x370031b9A06F0A1330034D06d47E2eBb827747Db" as `0x${string}`;
      const RECIPIENT =
        "0x69dBBAf6CE456F46224c41Db842cAA92E9edf629" as `0x${string}`;

      await sendTokens(TOKEN_ADDRESS, AMOUNT, RECIPIENT, extendedAccount);
      break;
    case "delete":
      const res = await extendedAccount.deleteSplitConfig({
        args: [BigInt(0)],
      });
      console.log("Split config deleted with:", res.hash);
      break;
    case "updateConfig":
      const res2 = await extendedAccount.updateSplitConfig({
        args: [
          BigInt(0),
          [
            "0x33dbD61Eee31551073D9F81cEd96eb924D6f10F7",
            "0xFa00D29d378EDC57AA1006946F0fc6230a5E3288",
          ],
          [80, 20],
        ],
      });
      console.log("Split limit updated with:", res2.hash);
      break;

    default:
      console.log(await extendedAccount.getInstalledPlugins({}));
      console.log(
        "Invalid command. Use one of: 'install', 'uninstall', 'create', 'send'."
      );
      console.log("Example: 'npm run execute install'");
      break;
  }

  return;
}

main();
