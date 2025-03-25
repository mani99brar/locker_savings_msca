import type { PluginConfig } from "@account-kit/plugingen";
import { sepolia, baseSepolia } from "viem/chains";
import { MultiOwnerPluginGenConfig } from "../multi-owner/config";
import { SplitPluginAbi } from "./abi";

// sepolia 0xFEd11a0C1c292F2823757925122222bb28b13443
export const SPLIT_PLUGIN_ADDRESS =
  "0x821fA29F49e46c022e96DC840058Fc4c94F8d8aF" as `0x${string}`;

export const SplitPluginGenConfig: PluginConfig = {
  name: "SplitPlugin",
  abi: SplitPluginAbi,
  addresses: {
    [baseSepolia.id]: SPLIT_PLUGIN_ADDRESS,
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
