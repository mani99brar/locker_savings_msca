import { modularAccountClient } from "../client";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const FILENAME = "accountInfo.json";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootDir = path.resolve(__dirname, "../../");

async function main() {
  const signer = modularAccountClient;

  const counterfactualAddress = await signer.getAddress();

  const filePath = path.join(rootDir, FILENAME); // Save in root directory
  let data: { [key: string]: any } = {};

  data["counterfactualAddress"] = counterfactualAddress;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  console.log("Your counterfactual address saved to:", filePath);
  return counterfactualAddress;
}

main().then((address) => {
  console.log("Your counterfactual address: ", address);
});
