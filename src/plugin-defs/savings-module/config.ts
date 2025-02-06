import type { PluginConfig } from "@account-kit/plugingen";
import { sepolia } from "viem/chains";
import { MultiOwnerPluginGenConfig } from "../multi-owner/config";
import { SavingsModuleAbi } from "./abi.js";

export const SavingsPluginGenConfig: PluginConfig = {
  name: "SavingsPlugin",
  abi: SavingsModuleAbi,
  addresses: {
    [sepolia.id]: "0xD0375320591ff87797CEb03CBeE80C82fD61BC77",
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
