import type { PluginConfig } from "@account-kit/plugingen";
import { sepolia } from "viem/chains";
import { SimpleCounterAbi } from "./abi";

export const SimpleCounterPluginGen: PluginConfig = {
  name: "SimpleCounterPlugin",
  abi: SimpleCounterAbi,
  addresses: {
    [sepolia.id]: "0x57C4defFE018D5Ffe65C23dbE31496C433ABce53",
  },
  installConfig: {
    initAbiParams: [],
  },
};
