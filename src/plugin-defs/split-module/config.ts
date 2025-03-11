import type { PluginConfig } from "@account-kit/plugingen";
import { sepolia, baseSepolia } from "viem/chains";
import { MultiOwnerPluginGenConfig } from "../multi-owner/config";
import { SplitPluginAbi } from "./abi";

export const SPLIT_PLUGIN_ADDRESS =
  "0xB46830d65d438d75b7177eE5450a019fe5C905f0" as `0x${string}`;

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
