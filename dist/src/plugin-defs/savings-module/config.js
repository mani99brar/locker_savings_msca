import { sepolia } from "viem/chains";
import { SavingsModuleAbi } from "./abi.js";
export const SavingsPluginGenConfig = {
    name: "SavingsPlugin",
    abi: SavingsModuleAbi,
    addresses: {
        [sepolia.id]: "0x96BEFBae4867f7E8b0257d905E0E97f132b99DfC",
    },
    installConfig: {
        initAbiParams: [],
    },
};
