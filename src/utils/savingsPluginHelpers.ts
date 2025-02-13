const SAVINGS_PLUGIN_ADDRESS = "0x4927729791055c0671950E8Ad736e1F0e531eF58";

async function installSavingsPlugin(extendedAccount: any) {
  console.log("Installing the savings plugin...");
  if (await isSavingsPluginInstalled(extendedAccount)) {
    console.log("Savings plugin already installed.");
    return null;
  }
  const res = await extendedAccount.installSavingsPlugin({
    args: [],
  });
  console.log("Savings Plugin installed:", res.hash);
  return res;
}

async function uninstallSavingsPlugin(extendedAccount: any) {
  console.log("Uninstalling the plugin...");
  if (!(await isSavingsPluginInstalled(extendedAccount))) {
    console.log("Savings plugin not installed.");
    return null;
  }
  const res = await extendedAccount.uninstallPlugin({
    args: [SAVINGS_PLUGIN_ADDRESS],
  });
  console.log("Savings Plugin uninstalled:", res.hash);
  return res;
}

async function createAutomation(extendedAccount: any): Promise<any> {
  console.log("Creating automation...");
  if (!(await isSavingsPluginInstalled(extendedAccount))) {
    console.log("Savings plugin not installed.");
    return null;
  }
  const res = await extendedAccount.createAutomation({
    args: ["0xFa00D29d378EDC57AA1006946F0fc6230a5E3288", BigInt(1000000)],
  });
  console.log("Automation created with:", res.hash);
  return res;
}

async function pauseAutomation(extendedAccount: any): Promise<any> {
  console.log("Pausing automation...");
  if (!(await isSavingsPluginInstalled(extendedAccount))) {
    console.log("Savings plugin not installed.");
    return null;
  }
  const res = await extendedAccount.pauseAutomation({
    args: [],
  });
  console.log("Automation paused with:", res.hash);
  return res;
}

async function isSavingsPluginInstalled(
  extendedAccount: any
): Promise<boolean> {
  const installedPlugins = await extendedAccount.getInstalledPlugins({});
  if (!installedPlugins.includes(SAVINGS_PLUGIN_ADDRESS)) {
    return false;
  }
  return true;
}

export {
  installSavingsPlugin,
  uninstallSavingsPlugin,
  createAutomation,
  pauseAutomation,
};
