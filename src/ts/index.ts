import { modularAccountClient } from "./client";
import { savingsPluginActions } from "../savings-gen/savings-config/savings/plugin";

/**
 * @description Creates a smart contract account, and sends ETH to the specified address (could be an EOA or SCA)
 * @note Seperating the logic to create the account, and the logic to send the transaction
 */
export async function main() {
  const savingsExtendedClient =
    modularAccountClient.extend(savingsPluginActions);
  console.log(savingsExtendedClient);
}

main();
