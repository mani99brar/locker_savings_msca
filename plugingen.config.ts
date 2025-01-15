import { defineConfig } from "@account-kit/plugingen";
import { CounterPluginGen } from "./src/plugin-defs/counter/config";
import { SavingsPluginGenConfig } from "./src/plugin-defs/savings-module/config";
import { sepolia } from "viem/chains";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig([
  {
    outDir: "./src/plugin-gens/counter-config",
    chain: sepolia,
    rpcUrl: process.env.SEPOLIA_RPC as string,
    plugins: [CounterPluginGen],
  },
  {
    outDir: "./src/plugin-gens/savings-config",
    chain: sepolia,
    rpcUrl: process.env.SEPOLIA_RPC as string,
    plugins: [SavingsPluginGenConfig],
  },
]);
