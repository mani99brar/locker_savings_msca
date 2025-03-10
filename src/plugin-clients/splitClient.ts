import * as dotenv from "dotenv";
dotenv.config();

import { modularAccountClient } from "../client";
import { splitPluginActions } from "../plugin-gens/split/plugin";
import {
    installSplitPlugin,
    uninstallSavingsPlugin,
    createSplit,
    pauseAutomation,
    type SplitAutomationArgs
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
          tokenAddress: "0x2EB77941b57d41a7686957E228a264560Ab20634",
          receiverAddresses: [
            "0x69dBBAf6CE456F46224c41Db842cAA92E9edf629",
            "0xFa00D29d378EDC57AA1006946F0fc6230a5E3288",
          ],
          percentage: [60, 40],
        };
      await createSplit(extendedAccount, splitArgs);
      break;

    case "pause":
      await pauseAutomation(extendedAccount, 0);
      break;

    case "send":
      const AMOUNT = BigInt(1500000);
      const TOKEN_ADDRESS = "0x2EB77941b57d41a7686957E228a264560Ab20634";
      const RECIPIENT = "0x69dBBAf6CE456F46224c41Db842cAA92E9edf62";
      await sendTokens(TOKEN_ADDRESS, AMOUNT, RECIPIENT, extendedAccount);
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
