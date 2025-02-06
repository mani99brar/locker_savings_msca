import * as dotenv from "dotenv";
import { encodeAbiParameters } from "viem";
dotenv.config();
import { modularAccountClient } from "./client";
import { savingsPluginActions } from "./plugin-gens/savings/plugin";

const SAVINGS_PLUGIN_ADDRESS = "0x9385427c71d3F05585Fd764C09A7FE2CFdD46938";
/**
 * @description Extends the client with a plugin
 */
export async function main() {
  const args = process.argv.slice(2);
  const extendedAccount = modularAccountClient.extend(savingsPluginActions);

  if (args.includes("install")) {
    const res = await extendedAccount.installSavingsPlugin({
      args: [],
    });
    console.log("Plugin installed with ", res.hash);
  } else if (args.includes("uninstall")) {
    const res = await extendedAccount.uninstallPlugin({
      pluginAddress: SAVINGS_PLUGIN_ADDRESS as `0x${string}`,
    });
    console.log("Plugin uninstalled with", res.hash);
  } else if (args.includes("sendToken")) {
    const TOKEN_ADDRESS = "0x1E00B1F11A048e789E7eE9de394F40DA45ADe0AA";
    const RECIPIENT = "0x69dBBAf6CE456F46224c41Db842cAA92E9edf629";
    const AMOUNT = BigInt(1500000);
    const transferData = encodeAbiParameters(
      [
        { name: "recipient", type: "address" },
        { name: "amount", type: "uint256" },
      ],
      [RECIPIENT, AMOUNT]
    );

    // Prepend the function selector for the transfer function
    const transferSelector = "0xa9059cbb"; // This is the selector for `transfer(address,uint256)`
    const data = transferSelector + transferData.slice(2);
    const res = await extendedAccount.sendUserOperation({
      uo: {
        target: TOKEN_ADDRESS as `0x${string}`,
        data: data as `0x${string}`,
        value: BigInt(0),
      },
    });
    console.log("Tokens sent with", res);
  } else if (args.includes("create")) {
    const res = await extendedAccount.createAutomation({
      args: [
        BigInt(0),
        "0xFa00D29d378EDC57AA1006946F0fc6230a5E3288",
        BigInt(1000000),
      ],
    });
    console.log("Automation created with", res);
  }

  console.log(
    "Installed Plugins:",
    await extendedAccount.getInstalledPlugins({})
  );
  return;
}

main();
