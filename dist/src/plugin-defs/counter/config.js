import { sepolia } from "viem/chains";
import { CounterAbi } from "./abi.js";
export const CounterPluginGen = {
    name: "CounterPlugin",
    abi: CounterAbi,
    addresses: {
        [sepolia.id]: "0x3e71215c32095fd32c458E683D557709c3cef2f9",
    },
    installConfig: {
        initAbiParams: [],
    },
};
