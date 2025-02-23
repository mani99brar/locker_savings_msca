import { defineConfig } from "@account-kit/plugingen";
import { SavingsPluginGenConfig } from "./src/plugin-defs/savings-module/config";
import { baseSepolia, sepolia } from "viem/chains";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig([
  {
    outDir: "./src/plugin-gens/",
    chain: baseSepolia,
    rpcUrl: process.env.SEPOLIA_RPC as string,
    plugins: [SavingsPluginGenConfig],
  },
]);
