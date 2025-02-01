import { defineConfig } from "@account-kit/plugingen";
import { SimpleCounterPluginGen } from "./src/plugin-defs/simple-counter/config";
import { SavingsPluginGenConfig } from "./src/plugin-defs/savings-module/config";
import { sepolia } from "viem/chains";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig([
  {
    outDir: "./src/plugin-gens/",
    chain: sepolia,
    rpcUrl: process.env.SEPOLIA_RPC as string,
    plugins: [SavingsPluginGenConfig],
  },
]);
