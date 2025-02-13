import type { PluginConfig } from "@account-kit/plugingen";
import { sepolia } from "viem/chains";
import { MultiOwnerPluginGenConfig } from "../multi-owner/config";
import { SavingsPluginAbi } from "@abi/SavingsPluginAbi.js";

export const SavingsPluginGenConfig: PluginConfig = {
  name: "SavingsPlugin",
  abi: SavingsPluginAbi,
  addresses: {
    [sepolia.id]: "0x4927729791055c0671950E8Ad736e1F0e531eF58",
  },
  installConfig: {
    initAbiParams: [],

    dependencies: [
      {
        plugin: MultiOwnerPluginGenConfig,
        functionId: "0x0",
      },
      {
        plugin: MultiOwnerPluginGenConfig,
        functionId: "0x1",
      },
    ],
  },
};
