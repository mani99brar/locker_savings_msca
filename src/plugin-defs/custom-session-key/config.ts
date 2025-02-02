import type { PluginConfig } from "@account-kit/plugingen";
import { parseAbiParameters } from "viem";
import { sepolia } from "viem/chains";
import { MultiOwnerPluginGenConfig } from "@account-kit/smart-contracts/plugindefs";
import { SessionKeyPluginAbi } from "@abi/SessionKeyPluginAbi";
import { CustomSessionKeyPluginAddress } from "@deployments/CustomSessionKeyDeployments.json";

export const SessionKeyPluginGenConfig: PluginConfig = {
  name: "SessionKeyPlugin",
  abi: SessionKeyPluginAbi,
  addresses: {
    [sepolia.id]: CustomSessionKeyPluginAddress as `0x${string}`,
  },
  installConfig: {
    initAbiParams: parseAbiParameters(
      "address[] initialKeys, bytes32[] tags, bytes[][] initialPermissions"
    ),
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
