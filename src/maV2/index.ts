import { modularAccountV2Client } from "./client";
import { sendTokens } from "@/utils/tokenHelpers";

const TOKEN_ADDRESS = "0x1E00B1F11A048e789E7eE9de394F40DA45ADe0AA";

export async function main() {
    const account = modularAccountV2Client;
    await sendTokens(
      TOKEN_ADDRESS,
      BigInt(1500000),
      "0xFa00D29d378EDC57AA1006946F0fc6230a5E3288",
      account
    );

}

main();