import { modularAccountClient } from "../client";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();

const FILENAME = "accountInfo.json";
const __dirname = import.meta.url.split("/src/scripts")[0].split("file://")[1];

async function main() {
  const signer = modularAccountClient;

  const counterfactualAddress = await signer.getAddress();

  const filePath = path.join(__dirname, FILENAME);
  let data: { [key: string]: any } = {};

  data["counterfactualAddress"] = counterfactualAddress;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return counterfactualAddress;
}

main().then((address) => {
  console.log("Your counterfactual address: ", address);
});
