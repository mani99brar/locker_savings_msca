// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

import {BasePlugin} from "../BasePlugin.sol";
import {IPluginExecutor} from "../../interfaces/IPluginExecutor.sol";
import {IStandardExecutor} from "../../interfaces/IStandardExecutor.sol";
import {ManifestFunction, ManifestExecutionHook, ManifestAssociatedFunctionType, ManifestAssociatedFunction, PluginManifest, PluginMetadata, IPlugin} from "../../interfaces/IPlugin.sol";
import {IERC20} from "forge-std/interfaces/IERC20.sol";
import {UserOperation} from "../../interfaces/erc4337/UserOperation.sol";
import {SIG_VALIDATION_PASSED
} from "../../libraries/Constants.sol";

/// @title Savings Plugin
/// @author Locker
/// @notice This plugin lets users automatically save when making payments
contract SplitPlugin is BasePlugin {
    string public constant NAME = "Locker Split Plugin";
    string public constant VERSION = "1.0.0";
    string public constant AUTHOR = "Locker Team";

    // Dependency indices for using the MultiOwner plugin for validation.
    uint256 internal constant _MANIFEST_DEPENDENCY_INDEX_OWNER_RUNTIME_VALIDATION = 0;
    uint256 internal constant _MANIFEST_DEPENDENCY_INDEX_OWNER_USER_OP_VALIDATION = 1;

    struct SplitConfig {
        address tokenAddress;
        address[] splitAddresses;
        uint32[] percentages;
        bool automationEnabled;
    }

    event SplitConfigCreated(address indexed user, address tokenAddress, address[] splitAddresses, uint32[] percentages);
    event SplitExecuted(address indexed user, address tokenAddress, address[] splitAddresses, uint32[] percentages);


    mapping(address =>  uint256[]) public splitConfigIndexes;
    mapping(uint256 => SplitConfig) public splitConfigs;
    uint256 public splitConfigCount;

    function createSplit(
        address _tokenAddress,
        address[] memory _splitAddresses,
        uint32[] memory _percentages
    ) external {
        require(_splitAddresses.length > 0, "SplitPlugin: No split addresses provided");
        require(_splitAddresses.length == _percentages.length, "SplitPlugin: Invalid split configuration");

        uint64 totalPercentage = 0;
        for (uint8 i = 0; i < _percentages.length; i++) {
            totalPercentage += _percentages[i];
        }
        require(totalPercentage == 100, "SplitPlugin: Invalid percentages.");
        uint256 currentSplitConfigIndex = splitConfigCount;
        splitConfigCount++;
        SplitConfig memory config = SplitConfig(
            _tokenAddress,
            _splitAddresses,
            _percentages,
            true
        );
        
        uint256[] storage userIndexes = splitConfigIndexes[msg.sender];
        userIndexes.push(currentSplitConfigIndex);
        splitConfigs[currentSplitConfigIndex] = config;        

        emit SplitConfigCreated(msg.sender, _tokenAddress, _splitAddresses, _percentages);
    }

    function pauseAutomation(uint256 _configIndex) external {
        SplitConfig storage config = splitConfigs[_configIndex];
        config.automationEnabled = false;
    }

    function onInstall(bytes calldata) external pure override {}

    function onUninstall(bytes calldata) external override {
    }

    function split(uint256 _configIndex) public {
        SplitConfig memory config = splitConfigs[_configIndex];
        IERC20 token = IERC20(config.tokenAddress);
        uint256 balance = token.balanceOf(address(msg.sender));

        if(!config.automationEnabled ||balance < 100) {
            return;
        }

        for (uint256 i = 0; i < config.splitAddresses.length; i++) {
            uint256 amount = (balance * config.percentages[i]) / 100;
            token.transfer(config.splitAddresses[i], amount);
        }

        emit SplitExecuted(msg.sender, config.tokenAddress, config.splitAddresses, config.percentages);
    }

    function postExecutionHook(uint8, bytes calldata ) external override virtual {
        uint256[] memory configIndexes = splitConfigIndexes[msg.sender];
            if(configIndexes.length == 0) {
                return;
            }
            for (uint256 i = 0; i < configIndexes.length; i++) {
                split(configIndexes[i]);
            }
    }

    /// @notice This function is overridden solely to satisfy the BasePlugin interface.
    /// @dev Since validation is delegated to the MultiOwner plugin, this function should never be called.
    function userOpValidationFunction(
        uint8, // functionId
        UserOperation calldata, // userOp
        bytes32              // userOpHash
    ) external pure override returns (uint256) {
        revert("SplitPlugin: use dependency for validation");
    }

    /// @notice Plugin manifest describing this plugin's functions and validations.
    /// @dev The manifest delegates both userOp and runtime validation to a dependency at index 0.
    function pluginManifest() external pure override returns (PluginManifest memory manifest) {
        // Declare two dependencies.
        manifest.dependencyInterfaceIds = new bytes4[](2);
        manifest.dependencyInterfaceIds[_MANIFEST_DEPENDENCY_INDEX_OWNER_RUNTIME_VALIDATION] = type(IPlugin).interfaceId;
        manifest.dependencyInterfaceIds[_MANIFEST_DEPENDENCY_INDEX_OWNER_USER_OP_VALIDATION] = type(IPlugin).interfaceId;

        // List the execution functions provided by this plugin.
        manifest.executionFunctions = new bytes4[](3);
        manifest.executionFunctions[0] = this.createSplit.selector;
        manifest.executionFunctions[1] = this.pauseAutomation.selector;
        manifest.executionFunctions[2] = this.split.selector;


        // Delegate user operation validation to the dependency in slot 1.
        manifest.userOpValidationFunctions = new ManifestAssociatedFunction[](2);
        manifest.userOpValidationFunctions[0] = ManifestAssociatedFunction({
            executionSelector: this.createSplit.selector,
            associatedFunction: ManifestFunction({
                functionType: ManifestAssociatedFunctionType.DEPENDENCY,
                functionId: 0, 
                dependencyIndex: _MANIFEST_DEPENDENCY_INDEX_OWNER_USER_OP_VALIDATION
            })
        });
        manifest.userOpValidationFunctions[1] = ManifestAssociatedFunction({
            executionSelector: this.pauseAutomation.selector,
            associatedFunction: ManifestFunction({
                functionType: ManifestAssociatedFunctionType.DEPENDENCY,
                functionId: 0, 
                dependencyIndex: _MANIFEST_DEPENDENCY_INDEX_OWNER_USER_OP_VALIDATION
            })
        });
        manifest.userOpValidationFunctions[0] = ManifestAssociatedFunction({
            executionSelector: this.split.selector,
            associatedFunction: ManifestFunction({
                functionType: ManifestAssociatedFunctionType.DEPENDENCY,
                functionId: 0, 
                dependencyIndex: _MANIFEST_DEPENDENCY_INDEX_OWNER_USER_OP_VALIDATION
            })
        });

        ManifestFunction memory preExecution = ManifestFunction({
            functionType: ManifestAssociatedFunctionType.NONE,
            functionId: 0,
            dependencyIndex: 0
        });

        ManifestFunction memory postExecution = ManifestFunction({
            functionType: ManifestAssociatedFunctionType.SELF,
            functionId: 0,
            dependencyIndex: 0
        });

        manifest.executionHooks = new ManifestExecutionHook[](1);
        manifest.executionHooks[0] = ManifestExecutionHook({
            executionSelector: IStandardExecutor.execute.selector,
            preExecHook: preExecution,
            postExecHook:postExecution

        });

        // We do not use runtime validation, so leave these arrays empty.
        manifest.runtimeValidationFunctions = new ManifestAssociatedFunction[](0);
        manifest.preRuntimeValidationHooks = new ManifestAssociatedFunction[](0);

        // Set permissions.
        manifest.permitAnyExternalAddress = true;
        manifest.canSpendNativeToken = true;
        manifest.permittedExecutionSelectors = new bytes4[](0);

        return manifest;
    }

    function pluginMetadata() external pure virtual override returns (PluginMetadata memory) {
        PluginMetadata memory metadata;
        metadata.name = NAME;
        metadata.version = VERSION;
        metadata.author = AUTHOR;
        return metadata;
    }
}
