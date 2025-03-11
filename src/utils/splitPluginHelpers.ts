// const SAVINGS_PLUGIN_ADDRESS = "0x4927729791055c0671950E8Ad736e1F0e531eF58"; // Sepolia
import { SPLIT_PLUGIN_ADDRESS } from "../plugin-defs/split-module/config";

async function installSplitPlugin(extendedAccount: any) {
  console.log("Installing the Split plugin...");
  if (await isSplitPluginInstalled(extendedAccount)) {
    console.log("Split plugin already installed.");
    return null;
  }
  const res = await extendedAccount.installSplitPlugin({
    args: [],
  });
  console.log("Split Plugin installed:", res.hash);
  return res;
}

async function uninstallSavingsPlugin(extendedAccount: any) {
  console.log("Uninstalling the split plugin...");
  if (!(await isSplitPluginInstalled(extendedAccount))) {
    console.log("Split plugin not installed.");
    return null;
  }
  const res = await extendedAccount.uninstallPlugin({
    pluginAddress: SPLIT_PLUGIN_ADDRESS,
  });
  console.log("Split Plugin uninstalled:", res.hash);
  return res;
}

type SplitAutomationArgs = {
  tokenAddress: string;
  receiverAddresses: string[];
  percentage: number[];
};

async function createSplit(
  extendedAccount: any,
  splitArgs: SplitAutomationArgs
): Promise<any> {
  console.log("Creating automation...");
  const { tokenAddress, percentage, receiverAddresses } = splitArgs;
  if (!(await isSplitPluginInstalled(extendedAccount))) {
    console.log("Split plugin not installed.");
    return null;
  }
  const res = await extendedAccount.createSplit({
    args: [tokenAddress, receiverAddresses, percentage],
  });
  console.log("Automation created with:", res.hash);
  return res;
}

async function pauseAutomation(
  extendedAccount: any,
  configIndex: number
): Promise<any> {
  console.log("Pausing automation...");
  if (!(await isSplitPluginInstalled(extendedAccount))) {
    console.log("Split plugin not installed.");
    return null;
  }
  const res = await extendedAccount.pauseAutomation({
    args: [configIndex],
  });
  console.log("Automation paused with:", res.hash);
  return res;
}

async function split(extendedAccount: any, configIndex: number): Promise<any> {
  console.log("Splitting...");
  if (!(await isSplitPluginInstalled(extendedAccount))) {
    console.log("Split plugin not installed.");
    return null;
  }
  const res = await extendedAccount.split({
    args: [BigInt(configIndex)],
  });
  console.log("Split with:", res.hash);
  return res;
}

async function isSplitPluginInstalled(
  extendedAccount: any
): Promise<boolean> {
  const installedPlugins = await extendedAccount.getInstalledPlugins({});
  if (!installedPlugins.includes(SPLIT_PLUGIN_ADDRESS)) {
    return false;
  }
  return true;
}

export {
  installSplitPlugin,
  uninstallSavingsPlugin,
  createSplit,
  pauseAutomation,
  split,
  type SplitAutomationArgs,
};
