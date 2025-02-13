import { encodeAbiParameters } from "viem";
async function sendTokens(
  tokenAddress: `0x${string}`,
  amount: bigint,
  recipient: `0x${string}`,
  extendedAccount: any
): Promise<any> {
  const transferData = encodeAbiParameters(
    [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    [recipient, amount]
  );

  // Prepend the function selector for the transfer function
  const transferSelector = "0xa9059cbb"; // This is the selector for `transfer(address,uint256)`
  const data = transferSelector + transferData.slice(2);

  const res = await extendedAccount.sendUserOperation({
    uo: {
      target: tokenAddress,
      data: data as `0x${string}`,
      value: BigInt(0),
    },
  });

  console.log("Tokens sent with", res.hash);
  return res;
}

export { sendTokens };
