"use client";

import React, { useState } from 'react';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { Plus, Coins, Users, Settings, Trophy, AlertCircle } from 'lucide-react';

const moduleAddress = "0x8b1d975418c7b824dfcb6d3281daa7e88feff0d072c7befe0e8bdba8585cc1b7";
const moduleName = "Gimodelo"; // Replace with your actual module name

// Token addresses full type paths for staking
const TOKEN_TYPE_ARGS = {
  APT: "0x1::aptos_coin::AptosCoin",
  USDC: "0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832::USDC::T",
  USDT: "0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b::coin::T",
};

// Token addresses - just the address part for pool creation
const TOKEN_ADDRESSES = {
  APT: "0x1",
  USDC: "0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832",
  USDT: "0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b",
};

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'admin', label: 'Admin Panel', icon: Settings },
    { id: 'create', label: 'Create Pool', icon: Plus },
    { id: 'stake', label: 'Stake', icon: Coins },
    { id: 'resolver', label: 'Become Resolver', icon: Users },
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === id
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          <Icon size={16} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

const AdminPanel: React.FC = () => {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [tokenAddress, setTokenAddress] = useState('');
  const [minFee, setMinFee] = useState('');
  const [removeTokenAddress, setRemoveTokenAddress] = useState('');
  const [resolverThreshold, setResolverThreshold] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToken = async () => {
    if (!tokenAddress || !minFee) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::add_accepted_token`,
          functionArguments: [tokenAddress, parseInt(minFee)],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setResult(`Token added successfully! Hash: ${response.hash}`);
      setTokenAddress('');
      setMinFee('');
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveToken = async () => {
    if (!removeTokenAddress) {
      alert('Please enter token address');
      return;
    }

    setIsLoading(true);
    try {
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::remove_accepted_token`,
          functionArguments: [removeTokenAddress],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setResult(`Token removed successfully! Hash: ${response.hash}`);
      setRemoveTokenAddress('');
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetThreshold = async () => {
    if (!resolverThreshold) {
      alert('Please enter threshold amount');
      return;
    }

    setIsLoading(true);
    try {
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::set_resolver_threshold`,
          functionArguments: [parseInt(resolverThreshold)],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setResult(`Threshold updated successfully! Hash: ${response.hash}`);
      setResolverThreshold('');
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="text-blue-500" />
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Add Token */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Add Accepted Token</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Token Address (0x...)"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Minimum Fee"
              value={minFee}
              onChange={(e) => setMinFee(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddToken}
              disabled={isLoading}
              className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400"
            >
              Add Token
            </button>
          </div>
        </div>

        {/* Remove Token */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Remove Token</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Token Address to Remove"
              value={removeTokenAddress}
              onChange={(e) => setRemoveTokenAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleRemoveToken}
              disabled={isLoading}
              className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400"
            >
              Remove Token
            </button>
          </div>
        </div>

        {/* Set Resolver Threshold */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Set Resolver Threshold</h3>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="New Threshold Amount"
              value={resolverThreshold}
              onChange={(e) => setResolverThreshold(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSetThreshold}
              disabled={isLoading}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
              Update Threshold
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className={`p-4 rounded-md ${result.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {result}
        </div>
      )}
    </div>
  );
};

const CreatePool: React.FC = () => {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [startTime, setStartTime] = useState('');
  const [bettingCutoff, setBettingCutoff] = useState('');
  const [resolveDelay, setResolveDelay] = useState('');
  const [selectedToken, setSelectedToken] = useState('APT');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreatePool = async () => {
    if (!question || !startTime || !bettingCutoff || !resolveDelay) {
      alert('Please fill in all fields');
      return;
    }

    if (options.some(opt => !opt.trim())) {
      alert('Please fill in all options');
      return;
    }

    setIsLoading(true);
    try {
      // Convert dates to timestamps
      const startTimestamp = Math.floor(new Date(startTime).getTime() / 1000);
      const bettingCutoffSeconds = parseInt(bettingCutoff) * 3600; // Convert hours to seconds
      const resolveDelaySeconds = parseInt(resolveDelay) * 3600; // Convert hours to seconds
      
      const tokenAddress = TOKEN_ADDRESSES[selectedToken as keyof typeof TOKEN_ADDRESSES];
      
      // Filter and properly format options
      const filteredOptions = options.filter(opt => opt.trim());
      
      console.log("Creating pool with:", {
        options: filteredOptions,
        startTimestamp,
        bettingCutoffSeconds,
        resolveDelaySeconds,
        tokenAddress
      });

      // The Aptos TypeScript SDK can handle vector<String> directly
      // No manual BCS encoding needed with the wallet adapter
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::create_pool`,
          functionArguments: [
            filteredOptions,                    // vector<String> - SDK handles this automatically
            startTimestamp,          // u64
            bettingCutoffSeconds,    // u64
            resolveDelaySeconds,     // u64
            tokenAddress,                       // address
          ],
        },
      };

      console.log("Transaction payload:", JSON.stringify(payload, null, 2));

      const response = await signAndSubmitTransaction(payload);
      setResult(`Pool "${question}" created successfully! Hash: ${response.hash}`);
      
      // Reset form
      setQuestion('');
      setOptions(['', '']);
      setStartTime('');
      setBettingCutoff('');
      setResolveDelay('');
    } catch (error: any) {
      console.error("Create pool error:", error);
      setResult(`Error: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Plus className="text-green-500" />
        <h2 className="text-2xl font-bold">Create Prediction Pool</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          {/* Question */}
          <div>
            <label className="block text-sm font-medium mb-2">Question/Event Description</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Will MetaMask launch its own token this year?"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            />
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium mb-2">Prediction Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {options.length > 2 && (
                  <button
                    onClick={() => removeOption(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addOption}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Option
            </button>
          </div>

          {/* Token Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Staking Token</label>
            <select
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="APT">APT (Aptos Coin)</option>
              <option value="USDC">USDC</option>
              <option value="USDT">USDT</option>
            </select>
          </div>

          {/* Timing */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Betting Cutoff (hours before start)</label>
              <input
                type="number"
                value={bettingCutoff}
                onChange={(e) => setBettingCutoff(e.target.value)}
                placeholder="e.g., 2"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Resolve Delay (hours after start)</label>
              <input
                type="number"
                value={resolveDelay}
                onChange={(e) => setResolveDelay(e.target.value)}
                placeholder="e.g., 24"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleCreatePool}
            disabled={isLoading}
            className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 font-medium"
          >
            {isLoading ? 'Creating Pool...' : 'Create Prediction Pool'}
          </button>
        </div>

        {result && (
          <div className={`mt-4 p-4 rounded-md ${result.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {result}
          </div>
        )}
      </div>

      {/* Debug Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Debug Info:</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Module Address:</strong> {moduleAddress}</p>
          <p><strong>Module Name:</strong> {moduleName}</p>
          <p><strong>Selected Token:</strong> {TOKEN_ADDRESSES[selectedToken as keyof typeof TOKEN_ADDRESSES]}</p>
          {startTime && <p><strong>Start Timestamp:</strong> {Math.floor(new Date(startTime).getTime() / 1000)}</p>}
          {bettingCutoff && <p><strong>Betting Cutoff (seconds):</strong> {parseInt(bettingCutoff) * 3600}</p>}
          {resolveDelay && <p><strong>Resolve Delay (seconds):</strong> {parseInt(resolveDelay) * 3600}</p>}
        </div>
      </div>
    </div>
  );
};

const StakePool: React.FC = () => {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [poolId, setPoolId] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [optionIndex, setOptionIndex] = useState('');
  const [selectedToken, setSelectedToken] = useState('APT');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleStake = async () => {
    if (!poolId || !stakeAmount || !optionIndex) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const tokenType = TOKEN_TYPE_ARGS[selectedToken as keyof typeof TOKEN_TYPE_ARGS];

      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::stake_pool`,
          typeArguments: [tokenType],
          functionArguments: [
            parseInt(poolId),
            parseInt(stakeAmount),
            parseInt(optionIndex),
          ],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setResult(`Stake placed successfully! Hash: ${response.hash}`);
      
      // Reset form
      setPoolId('');
      setStakeAmount('');
      setOptionIndex('');
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Coins className="text-yellow-500" />
        <h2 className="text-2xl font-bold">Stake in Pool</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Token</label>
            <select
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="APT">APT</option>
              <option value="USDC">USDC</option>
              <option value="USDT">USDT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Pool ID</label>
            <input
              type="number"
              value={poolId}
              onChange={(e) => setPoolId(e.target.value)}
              placeholder="Enter pool ID"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Stake Amount</label>
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="Amount in smallest units"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <small className="text-gray-600">Amount in smallest units (e.g., octas for APT)</small>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Option Index</label>
            <input
              type="number"
              value={optionIndex}
              onChange={(e) => setOptionIndex(e.target.value)}
              placeholder="0, 1, 2..."
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <small className="text-gray-600">0 for first option, 1 for second, etc.</small>
          </div>

          <button
            onClick={handleStake}
            disabled={isLoading}
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 font-medium"
          >
            {isLoading ? 'Staking...' : 'Place Stake'}
          </button>
        </div>

        {result && (
          <div className={`mt-4 p-4 rounded-md ${result.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

const BecomeResolver: React.FC = () => {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBecomeResolver = async () => {

    setIsLoading(true);
    try {
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::become_a_resolver`,
          // typeArguments: ["0x1::aptos_coin::AptosCoin"],
          functionArguments: [],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setResult(`Successfully became a resolver! Hash: ${response.hash}`);
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Users className="text-purple-500" />
        <h2 className="text-2xl font-bold">Become a Resolver</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <div className="mb-4 p-4 bg-blue-50 rounded-md">
          <div className="flex items-start space-x-2">
            <AlertCircle className="text-blue-500 mt-0.5" size={16} />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Resolver Role</p>
              <p>Resolvers help verify prediction outcomes and earn fees for their service. Your stake will be locked for a certain period.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleBecomeResolver}
            disabled={isLoading}
            className="w-full py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:bg-gray-400 font-medium"
          >
            {isLoading ? 'Processing...' : 'Become Resolver'}
          </button>
        </div>

        {result && (
          <div className={`mt-4 p-4 rounded-md ${result.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default function PredixInterface() {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState('create');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'admin':
        return <AdminPanel />;
      case 'create':
        return <CreatePool />;
      case 'stake':
        return <StakePool />;
      case 'resolver':
        return <BecomeResolver />;
      default:
        return <CreatePool />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Trophy className="text-blue-500" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">preDix</h1>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Decentralized Prediction Markets
            </span>
          </div>
          <WalletSelector />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {connected ? (
          <>
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderTabContent()}
          </>
        ) : (
          <div className="text-center py-20">
            <Trophy className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to preDix
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Decentralized prediction markets powered by blockchain technology
            </p>
            <p className="text-gray-500">
              Please connect your wallet to continue
            </p>
          </div>
        )}
      </main>
    </div>
  );
}