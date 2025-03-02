import { createModularAccountV2Client,  } from "@account-kit/smart-contracts";
import { alchemy, sepolia } from "@account-kit/infra";
import { LocalAccountSigner } from "@alchemy/aa-core";
import { type SmartAccountSigner } from "@aa-sdk/core"; 

import * as dotenv from "dotenv";

dotenv.config();

export const chain = sepolia;
const PRIV_KEY = process.env.PRIV_KEY!;

export const modularAccountV2Client = await createModularAccountV2Client({
  signer: LocalAccountSigner.privateKeyToAccountSigner(
    `0x${PRIV_KEY}`
  ) as SmartAccountSigner,
  chain,
  transport: alchemy({ apiKey: process.env.ALCHEMY_API_KEY as string }),
});
