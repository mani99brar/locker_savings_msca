// const SAVINGS_PLUGIN_ADDRESS = "0x4927729791055c0671950E8Ad736e1F0e531eF58"; // Sepolia
const SPLIT_PLUGIN_ADDRESS = "0xC1d4c6842e7388b53d09Bcc10Bd4FfC122c0c6DA"; // Base Sepolia

async function installSplitPlugin(extendedAccount: any) {
  console.log("Installing the Split plugin...");
  if (await isSplitPluginInstalled(extendedAccount)) {
    console.log("Split plugin already installed.");
    return null;
  }
  const res = await extendedAccount.installSavingsPlugin({
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
    args: [SPLIT_PLUGIN_ADDRESS],
  });
  console.log("Split Plugin uninstalled:", res.hash);
  return res;
}

type SplitAutomationArgs = {
    tokenAddress: string;
    receiverAddresses: string[];
    percentage: number[];
}
 

async function createSplit(extendedAccount: any,splitArgs:SplitAutomationArgs): Promise<any> {
    console.log("Creating automation...");
    const {tokenAddress, percentage, receiverAddresses} = splitArgs;
  if (!(await isSplitPluginInstalled(extendedAccount))) {
    console.log("Split plugin not installed.");
    return null;
  }
  const res = await extendedAccount.createAutomation({
    args: [tokenAddress, receiverAddresses, percentage],
  });
  console.log("Automation created with:", res.hash);
  return res;
}

async function pauseAutomation(extendedAccount: any, configIndex: number): Promise<any> {
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
  type SplitAutomationArgs
};
