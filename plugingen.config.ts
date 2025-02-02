import { defineConfig } from "@account-kit/plugingen";
import { CustomSessionKeyPluginConfig } from "./src/plugin-defs/custom-session-key/config";
import { sepolia } from "viem/chains";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig([
  {
    outDir: "./src/plugin-gens/",
    chain: sepolia,
    rpcUrl: process.env.SEPOLIA_RPC as string,
    plugins: [CustomSessionKeyPluginConfig],
  },
]);
