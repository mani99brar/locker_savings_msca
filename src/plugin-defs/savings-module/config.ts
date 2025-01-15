import type { PluginConfig } from "@account-kit/plugingen";
import { sepolia } from "viem/chains";
import { SavingsModuleAbi } from "./abi.js";

export const SavingsPluginGenConfig: PluginConfig = {
  name: "SavingsPlugin",
  abi: SavingsModuleAbi,
  addresses: {
    [sepolia.id]: "0x27415FF5A8d0E694Ad5c2daC808c4e0321B5c458",
  },
  installConfig: {
    initAbiParams: [],
  },
};
