import type { PluginConfig } from "@account-kit/plugingen";
import { sepolia } from "viem/chains";
import { SavingsModuleAbi } from "./abi.js";

export const SavingsPluginGenConfig: PluginConfig = {
  name: "SavingsPlugin",
  abi: SavingsModuleAbi,
  addresses: {
    [sepolia.id]: "0x3d257d56BdDbBf8499881d571a4604e688cc0Aff",
  },
};
