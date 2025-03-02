import { parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { sepolia, baseSepolia } from "viem/chains";
import * as dotenv from "dotenv";
dotenv.config();

import { counterfactualAddress as v1CounterfactualAddress } from "../../accountInfo.json";
import { counterfactualAddress as v2CounterfactualAddress } from "../../v2AccountInfo.json";
const PRIV_KEY = process.env.PRIV_KEY!;
const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL!;

async function main() {
  const args = process.argv.slice(2);
  let counterfactualAddress: string | undefined;
  if (args[0] == "V1") {
    counterfactualAddress = v1CounterfactualAddress;
  } else if (args[0] == "V2") {
    counterfactualAddress = v2CounterfactualAddress;
  }
  console.log(
    `Sending 0.05 ETH to ${counterfactualAddress} on chain ${sepolia.name}`
  );
  const account = privateKeyToAccount(`0x${PRIV_KEY}`);
  const wallet = createWalletClient({
    account: account,
    chain: sepolia,
    transport: http(ALCHEMY_API_URL),
  });

  const txHash = await wallet.sendTransaction({
    to: counterfactualAddress as `0x${string}`,
    value: parseEther("0.05"),
  });

  return txHash;
}

main().then((txHash) => {
  console.log("Transation hash: ", txHash);
});
