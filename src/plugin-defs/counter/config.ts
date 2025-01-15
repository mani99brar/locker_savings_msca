import type { PluginConfig } from "@account-kit/plugingen";
import { sepolia } from "viem/chains";
import { CounterAbi } from "./abi.js";

export const CounterPluginGen: PluginConfig = {
  name: "CounterPlugin",
  abi: CounterAbi,
  addresses: {
    [sepolia.id]: "0xA6c095f683106CbBC26e8d9A10Bd18840BfF1384",
  },
  installConfig: {
    initAbiParams: [],
  },
};
