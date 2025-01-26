import type { PluginConfig } from "@account-kit/plugingen";
import { sepolia } from "viem/chains";
import { SavingsModuleAbi } from "./abi.js";

export const SavingsPluginGenConfig: PluginConfig = {
  name: "SavingsPlugin",
  abi: SavingsModuleAbi,
  addresses: {
    [sepolia.id]: "0x2EB77941b57d41a7686957E228a264560Ab20634",
  },
  installConfig: {
    initAbiParams: [],
  },
};
