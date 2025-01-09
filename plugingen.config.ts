import { defineConfig } from "@account-kit/plugingen";
import { SavingsPluginGenConfig } from "./src/plugindefs/savings-module/config";
import { sepolia } from "viem/chains";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  outDir: "savings-module-msca/src/savings-config",
  chain: sepolia,
  rpcUrl: process.env.SEPOLIA_RPC as string,
  plugins: [SavingsPluginGenConfig],
});
