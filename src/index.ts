import * as dotenv from "dotenv";
dotenv.config();

import { modularAccountClient } from "./client";
import { savingsPluginActions } from "./plugin-gens/savings/plugin";
import {
  installSavingsPlugin,
  uninstallSavingsPlugin,
  createAutomation,
  pauseAutomation,
} from "./utils/savingsPluginHelpers";
import { sendTokens } from "./utils/tokenHelpers";

export async function main() {
  const args = process.argv.slice(2);
  const extendedAccount = modularAccountClient.extend(savingsPluginActions);

  switch (args[0]) {
    case "install":
      await installSavingsPlugin(extendedAccount);
      break;

    case "uninstall":
      await uninstallSavingsPlugin(extendedAccount);
      break;

    case "create":
      await createAutomation(extendedAccount);
      break;

    case "pause":
      await pauseAutomation(extendedAccount);
      break;

    case "send":
      const AMOUNT = BigInt(1500000);
      const TOKEN_ADDRESS = "0x2EB77941b57d41a7686957E228a264560Ab20634";
      const RECIPIENT = "0x69dBBAf6CE456F46224c41Db842cAA92E9edf629";
      await sendTokens(TOKEN_ADDRESS, AMOUNT, RECIPIENT, extendedAccount);
      break;

    default:
      console.log(
        "Invalid command. Use one of: 'install', 'uninstall', 'create', 'send'."
      );
      console.log("Example: 'npm run execute install'");
      break;
  }

  return;
}


main();
