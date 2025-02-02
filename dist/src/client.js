import { LocalAccountSigner } from "@aa-sdk/core";
import { alchemy, sepolia } from "@account-kit/infra";
import { createModularAccountAlchemyClient } from "@account-kit/smart-contracts";
import * as dotenv from "dotenv";
dotenv.config();
export const chain = sepolia;
const PRIV_KEY = process.env.PRIV_KEY;
export const modularAccountClient = await createModularAccountAlchemyClient({
    signer: LocalAccountSigner.privateKeyToAccountSigner(`0x${PRIV_KEY}`),
    chain,
    transport: alchemy({ apiKey: process.env.ALCHEMY_API_KEY }),
});
// t1protocal for yeild farming
