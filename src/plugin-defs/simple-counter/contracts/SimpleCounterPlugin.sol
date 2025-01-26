// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

import {BasePlugin} from "modular-account-libs/plugins/BasePlugin.sol";
import {PluginManifest, PluginMetadata} from "modular-account-libs/interfaces/IPlugin.sol";

contract SimpleCounterPlugin is BasePlugin {
    // Metadata
    string public constant NAME = "Simple Counter Plugin";
    string public constant VERSION = "1.0.0";
    string public constant AUTHOR = "Your Name";

    // Counter mapping to track counts per account
    mapping(address => uint256) public counts;

    // Function to increment the counter
    function increment() external {
        counts[msg.sender]++;
    }

    // Plugin interface functions
    function onInstall(bytes calldata) external pure override {}

    function onUninstall(bytes calldata) external pure override {}

    function pluginManifest() external pure override returns (PluginManifest memory) {
        PluginManifest memory manifest;
        manifest.executionFunctions = new bytes4[](1);
        manifest.executionFunctions[0] = this.increment.selector;
        return manifest;
    }

    function pluginMetadata() external pure override returns (PluginMetadata memory) {
        PluginMetadata memory metadata;
        metadata.name = NAME;
        metadata.version = VERSION;
        metadata.author = AUTHOR;
        return metadata;
    }
}