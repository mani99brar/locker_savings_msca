import { getContract, encodeAbiParameters, encodeFunctionData, } from "viem";
import { ChainNotFoundError, AccountNotFoundError, isSmartAccountClient, IncompatibleClientError, } from "@aa-sdk/core";
import { installPlugin as installPlugin_, } from "@account-kit/smart-contracts";
const addresses = {
    11155111: "0x57C4defFE018D5Ffe65C23dbE31496C433ABce53",
};
export const SimpleCounterPlugin = {
    meta: {
        name: "Simple Counter Plugin",
        version: "1.0.0",
        addresses,
    },
    getContract: (client, address) => {
        if (!client.chain)
            throw new ChainNotFoundError();
        return getContract({
            address: address || addresses[client.chain.id],
            abi: SimpleCounterPluginAbi,
            client: client,
        });
    },
};
export const simpleCounterPluginActions = (client) => ({
    increment({ overrides, context, account = client.account }) {
        if (!account) {
            throw new AccountNotFoundError();
        }
        if (!isSmartAccountClient(client)) {
            throw new IncompatibleClientError("SmartAccountClient", "increment", client);
        }
        const uo = encodeFunctionData({
            abi: SimpleCounterPluginExecutionFunctionAbi,
            functionName: "increment",
        });
        return client.sendUserOperation({ uo, overrides, account, context });
    },
    installSimpleCounterPlugin({ account = client.account, overrides, context, ...params }) {
        if (!account) {
            throw new AccountNotFoundError();
        }
        if (!isSmartAccountClient(client)) {
            throw new IncompatibleClientError("SmartAccountClient", "installSimpleCounterPlugin", client);
        }
        const chain = client.chain;
        if (!chain) {
            throw new ChainNotFoundError();
        }
        const dependencies = params.dependencyOverrides ?? [];
        const pluginAddress = params.pluginAddress ??
            SimpleCounterPlugin.meta.addresses[chain.id];
        if (!pluginAddress) {
            throw new Error("missing SimpleCounterPlugin address for chain " + chain.name);
        }
        return installPlugin_(client, {
            pluginAddress,
            pluginInitData: encodeAbiParameters([], params.args),
            dependencies,
            overrides,
            account,
            context,
        });
    },
    encodeIncrement() {
        return encodeFunctionData({
            abi: SimpleCounterPluginExecutionFunctionAbi,
            functionName: "increment",
        });
    },
});
export const SimpleCounterPluginExecutionFunctionAbi = [
    {
        type: "function",
        name: "increment",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable",
    },
];
export const SimpleCounterPluginAbi = [
    {
        type: "function",
        name: "AUTHOR",
        inputs: [],
        outputs: [{ name: "", type: "string", internalType: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "NAME",
        inputs: [],
        outputs: [{ name: "", type: "string", internalType: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "VERSION",
        inputs: [],
        outputs: [{ name: "", type: "string", internalType: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "counts",
        inputs: [{ name: "", type: "address", internalType: "address" }],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "increment",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "onInstall",
        inputs: [{ name: "", type: "bytes", internalType: "bytes" }],
        outputs: [],
        stateMutability: "pure",
    },
    {
        type: "function",
        name: "onUninstall",
        inputs: [{ name: "", type: "bytes", internalType: "bytes" }],
        outputs: [],
        stateMutability: "pure",
    },
    {
        type: "function",
        name: "pluginManifest",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "tuple",
                internalType: "struct PluginManifest",
                components: [
                    { name: "interfaceIds", type: "bytes4[]", internalType: "bytes4[]" },
                    {
                        name: "dependencyInterfaceIds",
                        type: "bytes4[]",
                        internalType: "bytes4[]",
                    },
                    {
                        name: "executionFunctions",
                        type: "bytes4[]",
                        internalType: "bytes4[]",
                    },
                    {
                        name: "permittedExecutionSelectors",
                        type: "bytes4[]",
                        internalType: "bytes4[]",
                    },
                    {
                        name: "permitAnyExternalAddress",
                        type: "bool",
                        internalType: "bool",
                    },
                    { name: "canSpendNativeToken", type: "bool", internalType: "bool" },
                    {
                        name: "permittedExternalCalls",
                        type: "tuple[]",
                        internalType: "struct ManifestExternalCallPermission[]",
                        components: [
                            {
                                name: "externalAddress",
                                type: "address",
                                internalType: "address",
                            },
                            { name: "permitAnySelector", type: "bool", internalType: "bool" },
                            { name: "selectors", type: "bytes4[]", internalType: "bytes4[]" },
                        ],
                    },
                    {
                        name: "userOpValidationFunctions",
                        type: "tuple[]",
                        internalType: "struct ManifestAssociatedFunction[]",
                        components: [
                            {
                                name: "executionSelector",
                                type: "bytes4",
                                internalType: "bytes4",
                            },
                            {
                                name: "associatedFunction",
                                type: "tuple",
                                internalType: "struct ManifestFunction",
                                components: [
                                    {
                                        name: "functionType",
                                        type: "uint8",
                                        internalType: "enum ManifestAssociatedFunctionType",
                                    },
                                    { name: "functionId", type: "uint8", internalType: "uint8" },
                                    {
                                        name: "dependencyIndex",
                                        type: "uint256",
                                        internalType: "uint256",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: "runtimeValidationFunctions",
                        type: "tuple[]",
                        internalType: "struct ManifestAssociatedFunction[]",
                        components: [
                            {
                                name: "executionSelector",
                                type: "bytes4",
                                internalType: "bytes4",
                            },
                            {
                                name: "associatedFunction",
                                type: "tuple",
                                internalType: "struct ManifestFunction",
                                components: [
                                    {
                                        name: "functionType",
                                        type: "uint8",
                                        internalType: "enum ManifestAssociatedFunctionType",
                                    },
                                    { name: "functionId", type: "uint8", internalType: "uint8" },
                                    {
                                        name: "dependencyIndex",
                                        type: "uint256",
                                        internalType: "uint256",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: "preUserOpValidationHooks",
                        type: "tuple[]",
                        internalType: "struct ManifestAssociatedFunction[]",
                        components: [
                            {
                                name: "executionSelector",
                                type: "bytes4",
                                internalType: "bytes4",
                            },
                            {
                                name: "associatedFunction",
                                type: "tuple",
                                internalType: "struct ManifestFunction",
                                components: [
                                    {
                                        name: "functionType",
                                        type: "uint8",
                                        internalType: "enum ManifestAssociatedFunctionType",
                                    },
                                    { name: "functionId", type: "uint8", internalType: "uint8" },
                                    {
                                        name: "dependencyIndex",
                                        type: "uint256",
                                        internalType: "uint256",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: "preRuntimeValidationHooks",
                        type: "tuple[]",
                        internalType: "struct ManifestAssociatedFunction[]",
                        components: [
                            {
                                name: "executionSelector",
                                type: "bytes4",
                                internalType: "bytes4",
                            },
                            {
                                name: "associatedFunction",
                                type: "tuple",
                                internalType: "struct ManifestFunction",
                                components: [
                                    {
                                        name: "functionType",
                                        type: "uint8",
                                        internalType: "enum ManifestAssociatedFunctionType",
                                    },
                                    { name: "functionId", type: "uint8", internalType: "uint8" },
                                    {
                                        name: "dependencyIndex",
                                        type: "uint256",
                                        internalType: "uint256",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: "executionHooks",
                        type: "tuple[]",
                        internalType: "struct ManifestExecutionHook[]",
                        components: [
                            {
                                name: "executionSelector",
                                type: "bytes4",
                                internalType: "bytes4",
                            },
                            {
                                name: "preExecHook",
                                type: "tuple",
                                internalType: "struct ManifestFunction",
                                components: [
                                    {
                                        name: "functionType",
                                        type: "uint8",
                                        internalType: "enum ManifestAssociatedFunctionType",
                                    },
                                    { name: "functionId", type: "uint8", internalType: "uint8" },
                                    {
                                        name: "dependencyIndex",
                                        type: "uint256",
                                        internalType: "uint256",
                                    },
                                ],
                            },
                            {
                                name: "postExecHook",
                                type: "tuple",
                                internalType: "struct ManifestFunction",
                                components: [
                                    {
                                        name: "functionType",
                                        type: "uint8",
                                        internalType: "enum ManifestAssociatedFunctionType",
                                    },
                                    { name: "functionId", type: "uint8", internalType: "uint8" },
                                    {
                                        name: "dependencyIndex",
                                        type: "uint256",
                                        internalType: "uint256",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
        stateMutability: "pure",
    },
    {
        type: "function",
        name: "pluginMetadata",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "tuple",
                internalType: "struct PluginMetadata",
                components: [
                    { name: "name", type: "string", internalType: "string" },
                    { name: "version", type: "string", internalType: "string" },
                    { name: "author", type: "string", internalType: "string" },
                    {
                        name: "permissionDescriptors",
                        type: "tuple[]",
                        internalType: "struct SelectorPermission[]",
                        components: [
                            {
                                name: "functionSelector",
                                type: "bytes4",
                                internalType: "bytes4",
                            },
                            {
                                name: "permissionDescription",
                                type: "string",
                                internalType: "string",
                            },
                        ],
                    },
                ],
            },
        ],
        stateMutability: "pure",
    },
    {
        type: "function",
        name: "postExecutionHook",
        inputs: [
            { name: "functionId", type: "uint8", internalType: "uint8" },
            { name: "preExecHookData", type: "bytes", internalType: "bytes" },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "preExecutionHook",
        inputs: [
            { name: "functionId", type: "uint8", internalType: "uint8" },
            { name: "sender", type: "address", internalType: "address" },
            { name: "value", type: "uint256", internalType: "uint256" },
            { name: "data", type: "bytes", internalType: "bytes" },
        ],
        outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "preRuntimeValidationHook",
        inputs: [
            { name: "functionId", type: "uint8", internalType: "uint8" },
            { name: "sender", type: "address", internalType: "address" },
            { name: "value", type: "uint256", internalType: "uint256" },
            { name: "data", type: "bytes", internalType: "bytes" },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "preUserOpValidationHook",
        inputs: [
            { name: "functionId", type: "uint8", internalType: "uint8" },
            {
                name: "userOp",
                type: "tuple",
                internalType: "struct UserOperation",
                components: [
                    { name: "sender", type: "address", internalType: "address" },
                    { name: "nonce", type: "uint256", internalType: "uint256" },
                    { name: "initCode", type: "bytes", internalType: "bytes" },
                    { name: "callData", type: "bytes", internalType: "bytes" },
                    { name: "callGasLimit", type: "uint256", internalType: "uint256" },
                    {
                        name: "verificationGasLimit",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    {
                        name: "preVerificationGas",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    { name: "maxFeePerGas", type: "uint256", internalType: "uint256" },
                    {
                        name: "maxPriorityFeePerGas",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    { name: "paymasterAndData", type: "bytes", internalType: "bytes" },
                    { name: "signature", type: "bytes", internalType: "bytes" },
                ],
            },
            { name: "userOpHash", type: "bytes32", internalType: "bytes32" },
        ],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "runtimeValidationFunction",
        inputs: [
            { name: "functionId", type: "uint8", internalType: "uint8" },
            { name: "sender", type: "address", internalType: "address" },
            { name: "value", type: "uint256", internalType: "uint256" },
            { name: "data", type: "bytes", internalType: "bytes" },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "supportsInterface",
        inputs: [{ name: "interfaceId", type: "bytes4", internalType: "bytes4" }],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "userOpValidationFunction",
        inputs: [
            { name: "functionId", type: "uint8", internalType: "uint8" },
            {
                name: "userOp",
                type: "tuple",
                internalType: "struct UserOperation",
                components: [
                    { name: "sender", type: "address", internalType: "address" },
                    { name: "nonce", type: "uint256", internalType: "uint256" },
                    { name: "initCode", type: "bytes", internalType: "bytes" },
                    { name: "callData", type: "bytes", internalType: "bytes" },
                    { name: "callGasLimit", type: "uint256", internalType: "uint256" },
                    {
                        name: "verificationGasLimit",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    {
                        name: "preVerificationGas",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    { name: "maxFeePerGas", type: "uint256", internalType: "uint256" },
                    {
                        name: "maxPriorityFeePerGas",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    { name: "paymasterAndData", type: "bytes", internalType: "bytes" },
                    { name: "signature", type: "bytes", internalType: "bytes" },
                ],
            },
            { name: "userOpHash", type: "bytes32", internalType: "bytes32" },
        ],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "nonpayable",
    },
    { type: "error", name: "AlreadyInitialized", inputs: [] },
    { type: "error", name: "InvalidAction", inputs: [] },
    {
        type: "error",
        name: "NotContractCaller",
        inputs: [{ name: "caller", type: "address", internalType: "address" }],
    },
    {
        type: "error",
        name: "NotImplemented",
        inputs: [
            { name: "selector", type: "bytes4", internalType: "bytes4" },
            { name: "functionId", type: "uint8", internalType: "uint8" },
        ],
    },
    { type: "error", name: "NotInitialized", inputs: [] },
];
