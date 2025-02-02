// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {SessionKeyPlugin} from "../contracts/plugins/session/SessionKeyPlugin.sol";

contract CustomSessionKeyPlugin is Script {
    function run() public {
        vm.startBroadcast();

        // Deploy contract
        SessionKeyPlugin sessionKeyPlugin = new SessionKeyPlugin();
        address deployedAddress = address(sessionKeyPlugin);

        console.log("Deployed SessionKeyPlugin at:", deployedAddress);

        // Save the address to a file using vm.writeFile
        string memory filePath = "deployments/CustomSessionKeyDeployments.json";
        string memory jsonContent = string.concat(
            '{ "CustomSessionKeyPluginAddress": "',
            vm.toString(deployedAddress),
            '" }'
        );
        
        vm.writeFile(filePath, jsonContent);

        vm.stopBroadcast();
    }
}
