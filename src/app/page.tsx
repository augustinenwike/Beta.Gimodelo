"use client";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import React, { useState } from 'react';
import { Plus, Trophy, Clock, Search, ArrowLeft, ChevronRight, Flame, BarChart3, Settings, Users, CheckCircle, TrendingUp, Coins, PieChart, Eye, EyeOff, Award, DollarSign, Target, Shield } from 'lucide-react';

// Mock Backend Data
const MOCK_POOLS = [
  {
    id: 4,
    question: "Will MetaMask launch its own token in 2025?",
    category: "Crypto",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&h=300&fit=crop",
    options: ["Yes", "No"],
    percentages: [68, 32],
    volume: 12,
    endTime: "2025-12-31T23:59:59",
    creator: "0xabc...def1",
    resolver: "0x789...abc2",
    status: "active",
    token: "APT",
    predictors: 2
  },
  {
    id: 2,
    question: "US government shutdown by year end?",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=300&fit=crop",
    options: ["Yes", "No"],
    percentages: [79, 21],
    volume: 0,
    endTime: "2026-01-01T00:00:00",
    creator: "0x123...456a",
    resolver: "0xdef...456b",
    status: "active",
    token: "APT",
    predictors: 0
  },
  {
    id: 8,
    question: "Which continent will win the Aptos global hackathon?",
    category: "Hackathon",
    image: "Image/APT.png",
    options: ["Africa", "Asia", "Europe", "North America", "South America"],
    percentages: [25, 35, 20, 15, 5],
    volume: 100,
    endTime: "2025-11-15T16:00:00",
    creator: "0xdef...789b",
    resolver: "0x456...def3",
    status: "active",
    token: "APT",
    predictors: 7
  },
  {
    id: 5,
    question: "Bitcoin above $100,000 by end of 2025?",
    category: "Crypto",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop",
    options: ["Yes", "No"],
    percentages: [55, 45],
    volume: 265,
    endTime: "2025-12-31T23:59:59",
    creator: "0x789...abc2",
    resolver: "0xabc...789c",
    status: "active",
    token: "APT",
    predictors: 14
  },
  {
    id: 6,
    question: "Man Utd vs Liverpool?",
    category: "Sports",
    image: "Image/1_United-LFC.webp",
    options: ["Man utd", "Liverpool", "Draw"],
    percentages: [25, 70, 5],
    volume: 18,
    endTime: "2025-10-19T16:30:00",
    creator: "0x456...def3",
    resolver: "0x123...456d",
    status: "active",
    token: "APT",
    predictors: 4
  },
  {
    id: 3,
    question: "Champions League winners 2025?",
    category: "Sports",
    image: "Image/Champ.webp",
    options: ["Barca", "Real madrid", "Bayern", "Inter", "Liverpool", "Man city", "PSG", "Aresnal","Napoli","Another team"],
    percentages: [18, 23, 13, 5, 9, 7, 12, 7, 5, 1],
    volume: 55,
    endTime: "2026-05-20T20:00:00",
    creator: "0xspo...rts1",
    resolver: "0xspo...rts2",
    status: "active",
    token: "APT",
    predictors: 5
  }
];

const TOP_CREATORS = [
  { rank: 1, name: "Domestic_Bogeyman_ez", address: "0x897f60...427ef8", volume: 265, predictors: 14 },
  { rank: 2, name: "0xbabywhale", address: "0x5c00d7...8cd0b5", volume: 100, predictors: 7 },
  { rank: 3, name: "Geraldgzus", address: "0x57392a...bd1808", volume: 55, predictors: 5 },
  { rank: 4, name: "Rolex", address: "0x633ef9...5b7fbd", volume: 18, predictors: 4 }
];

const moduleAddress = "0x8b1d975418c7b824dfcb6d3281daa7e88feff0d072c7befe0e8bdba8585cc1b7";
const moduleName = "Gimodelo"; // Replace with your actual module name

// Token addresses full type paths for staking
const TOKEN_TYPE_ARGS = {
  APT: "0x1::aptos_coin::AptosCoin",
  // USDC: "0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832",
  // USDT: "0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b::coin::T",
};

// Token addresses - just the address part for pool creation
const TOKEN_ADDRESSES = {
  APT: "0x1",
  // USDC: "0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832",
  // USDT: "0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b",
};

const PoolCard = ({ pool, onClick }: { pool: any; onClick: () => void }) => {
  const timeLeft = new Date(pool.endTime).getTime() - new Date().getTime();
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  return (
    <div 
      onClick={onClick}
      className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-red-950/20 transition-all cursor-pointer border border-zinc-800 hover:border-red-900/50 group"
    >
      <div className="relative h-40 overflow-hidden">
        <img src={pool.image} alt={pool.question} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent"></div>
        <div className="absolute top-3 right-3 bg-zinc-950/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-red-400 border border-red-900/30">
          {pool.percentages[0]}%
        </div>
        <div className="absolute top-3 left-3 bg-zinc-950/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-zinc-400 border border-zinc-800">
          {pool.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-medium text-sm mb-4 line-clamp-2 min-h-[2.5rem]">{pool.question}</h3>

        <div className="flex gap-2 mb-4">
          <button className="flex-1 bg-emerald-950/40 hover:bg-emerald-950/60 text-emerald-400 py-2.5 rounded-lg text-xs font-semibold transition-all border border-emerald-900/30 hover:border-emerald-700/50">
            {pool.options[0]} {pool.percentages[0]}%
          </button>
          <button className="flex-1 bg-red-950/40 hover:bg-red-950/60 text-red-400 py-2.5 rounded-lg text-xs font-semibold transition-all border border-red-900/30 hover:border-red-700/50">
            {pool.options[1]} {pool.percentages[1]}%
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center space-x-1">
            <DollarSign size={13} />
            <span>${(pool.volume).toFixed(1)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={13} />
            <span>{pool.predictors}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={13} />
            <span>{daysLeft}d</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MarketExplorer = ({ onPoolSelect }: { onPoolSelect: (pool: any) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Trending', 'Crypto', 'Politics', 'Sports',];

  const filteredPools = MOCK_POOLS.filter(pool => {
    const matchesSearch = pool.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || selectedCategory === 'Trending' || pool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-red-950/30 to-zinc-950 border border-red-900/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-sm mb-1">Total Volume</p>
              <p className="text-white text-3xl font-bold">$450</p>
            </div>
            <BarChart3 className="text-red-500" size={40} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-sm mb-1">Active Markets</p>
              <p className="text-white text-3xl font-bold">{MOCK_POOLS.length}</p>
            </div>
            <TrendingUp className="text-emerald-500" size={40} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-sm mb-1">Total Predictors</p>
              <p className="text-white text-3xl font-bold">20</p>
            </div>
            <Users className="text-blue-500" size={40} />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" size={20} />
        <input
          type="text"
          placeholder="Search markets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900 text-white pl-12 pr-4 py-4 rounded-xl border border-zinc-800 focus:border-red-900 focus:outline-none placeholder-zinc-600"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-red-900 text-white shadow-lg shadow-red-900/30'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            {cat === 'Trending' && <Flame size={16} />}
            {cat}
          </button>
        ))}
      </div>

      {/* Market Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPools.map(pool => (
          <PoolCard key={pool.id} pool={pool} onClick={() => onPoolSelect(pool)} />
        ))}
      </div>
    </div>
  );
};

const PoolDetailView = ({ pool, onBack }: { pool: any; onBack: () => void }) => {

  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [poolId, setPoolId] = useState(pool.id.toString());
  // const [stakeAmount, setStakeAmount] = useState('');
  const [optionIndex, setOptionIndex] = useState(0);
  const [selectedToken, setSelectedToken] = useState(pool.token);
  // const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const [selectedOption, setSelectedOption] = useState(0);
  const [stakeAmount, setStakeAmount] = useState('');
  const [result, setResult] = useState('');

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      setResult('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      const tokenType = TOKEN_TYPE_ARGS[selectedToken as keyof typeof TOKEN_TYPE_ARGS];
      const amountInSmallestUnit = Math.floor(parseFloat(stakeAmount) * 1000000);

      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::stake_pool`,
          typeArguments: [tokenType],
          functionArguments: [
            parseInt(poolId),
            parseInt(amountInSmallestUnit.toString()),
            optionIndex,
          ],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setResult(`Stake placed successfully! 🎉`);
      // Hash: ${response.hash}
      
      // Reset form
      setStakeAmount('');
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const calculatePotentialWinnings = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return '0.00';
    
    const stake = parseFloat(stakeAmount);
    const totalPool = pool.volume;
    const winningPercentage = pool.percentages[selectedOption];
    const losingPercentage = pool.percentages[selectedOption === 0 ? 1 : 0];
    
    // Amount staked on winning side (including user's stake)
    const winningPoolAmount = (totalPool * winningPercentage / 100) + stake;
    
    // Amount staked on losing side
    const losingPoolAmount = totalPool * losingPercentage / 100;
    
    // Total pool after fees (99% of total)
    const totalPoolAfterFees = (totalPool + stake) * 0.99;
    
    // User's share of the winning pool
    const userShareOfWinningPool = stake / winningPoolAmount;
    
    // User's potential winnings (their share of the entire pool after fees)
    const potentialReturn = totalPoolAfterFees * userShareOfWinningPool;
    
    return potentialReturn.toFixed(2);
  };
  
  const potentialWinnings = calculatePotentialWinnings();


  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-zinc-400 hover:text-white mb-6 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to markets</span>
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pool Header */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl overflow-hidden border border-zinc-800">
            <div className="relative h-64">
              <img src={pool.image} alt={pool.question} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block bg-red-900 text-white text-xs px-3 py-1 rounded-full mb-3 font-semibold">
                  {pool.category}
                </span>
                <h1 className="text-3xl font-bold text-white">{pool.question}</h1>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-zinc-500 text-xs mb-1">Volume</p>
                  <p className="text-white font-semibold">${(pool.volume / 1000).toFixed(1)}k</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs mb-1">Predictors</p>
                  <p className="text-white font-semibold">{pool.predictors}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs mb-1">Token</p>
                  <p className="text-white font-semibold">{pool.token}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs mb-1">Ends</p>
                  <p className="text-white font-semibold">{new Date(pool.endTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Outcome Display */}
          <div className="grid grid-cols-2 gap-4">
            {pool.options.map((option: string, idx: number) => (
              <div key={idx} className={`bg-gradient-to-br rounded-xl p-8 text-center border-2 ${
                idx === 0 
                  ? 'from-red-950/30 to-zinc-950 border-red-900/30' 
                  : 'from-red-950/30 to-zinc-950 border-red-900/30'
              }`}>
                <div className={`text-6xl font-bold mb-2 ${idx === 0 ? 'text-red-400' : 'text-red-400'}`}>
                  {pool.percentages[idx]}%
                </div>
                <div className="text-white text-xl font-semibold mb-2">{option}</div>
                <div className="text-zinc-500 text-sm">
                  ${((pool.volume * pool.percentages[idx]) / 100).toFixed(1)} staked
                </div>
              </div>
            ))}
          </div>

          {/* Pool Info */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-white font-semibold mb-4">Pool Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Pool Id</span>
                <span className="text-white font-mono">{pool.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Creator</span>
                <span className="text-white font-mono">{pool.creator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Resolver</span>
                <span className="text-white font-mono">{pool.resolver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Status</span>
                <span className="text-emerald-400 capitalize">{pool.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Betting Interface */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-6 border border-zinc-800 sticky top-6">
            <h3 className="text-white font-semibold mb-5 text-lg">Place Your Prediction</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs text-zinc-400 mb-3 font-medium">Pick a side</label>
                <div className="grid grid-cols-3 gap-2">
                  {pool.options.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setOptionIndex(idx)}
                      className={`flex-1 py-4 rounded-lg text-xs font-bold transition-all ${
                        optionIndex === idx
                          ? idx === 0
                            ? 'bg-red-900 text-red-300 shadow-lg shadow-red-900/30 border-2 border-red-700'
                            : 'bg-red-900 text-red-300 shadow-lg shadow-red-900/30 border-2 border-red-700'
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border-2 border-zinc-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2 font-medium">Amount ({pool.token})</label>
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-zinc-800 text-white text-lg px-4 py-4 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none"
                />
              </div>

              <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-600">Platform Fee (1%)</span>
                  <span className="text-zinc-600">${((parseFloat(stakeAmount) || 0) * 0.01).toFixed(2)}</span>
                </div>
              </div>

              <button
                disabled={!connected || isLoading}
                onClick={handleStake}
                className="w-full py-4 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Place Prediction
              </button>
              {!connected && (
                <div className="p-4 rounded-lg text-xs font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
                  Please connect your wallet to stake
                </div>
              )}

              <div className="w-full">
                {result && (
                <div className={`p-4 rounded-lg text-xs font-semibold text-center ${
                  result.includes('success') ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' : 'bg-red-950/50 text-red-400 border border-red-900/30'
                }`}>
                  {result}
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [tokenAddress, setTokenAddress] = useState('');
  const [minFee, setMinFee] = useState('');
  const [removeTokenAddress, setRemoveTokenAddress] = useState('');
  const [resolverThreshold, setResolverThreshold] = useState('');
  const [creatorAddress, setCreatorAddress] = useState('');
  const [revokeAddress, setRevokeAddress] = useState('');
  const [withdrawPoolId, setWithdrawPoolId] = useState('');
  const [addResult, setAddResult] = useState('');
  const [removeResult, setRemoveResult] = useState('');
  const [thresholdResult, setThresholdResult] = useState('');
  const [grantResult, setGrantResult] = useState('');
  const [revokeResult, setRevokeResult] = useState('');
  const [withdrawResult, setWithdrawResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isThresholdLoading, setIsThresholdLoading] = useState(false);
  const [isGrantLoading, setIsGrantLoading] = useState(false);
  const [isRevokeLoading, setIsRevokeLoading] = useState(false);
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);
  const [detectedToken, setDetectedToken] = useState<string>('');

  const handlePoolIdChange = (poolId: string) => {
    setWithdrawPoolId(poolId);
    setWithdrawResult('');
    
    if (poolId) {
      const pool = MOCK_POOLS.find(p => p.id === parseInt(poolId));
      if (pool) {
        setDetectedToken(pool.token);
      } else {
        setDetectedToken('');
      }
    } else {
      setDetectedToken('');
    }
  };

  const handleAddToken = async () => {
    if (!tokenAddress || !minFee) {
      setAddResult('Please fill in all fields');
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
      setAddResult(`Token added successfully!`);
      setTokenAddress('');
      setMinFee('');
    } catch (error: any) {
      setAddResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveToken = async () => {
    if (!removeTokenAddress) {
      setRemoveResult('Please enter token address');
      return;
    }

    setIsRemoving(true);
    try {
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::remove_accepted_token`,
          functionArguments: [removeTokenAddress],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setRemoveResult(`Token removed successfully!`);
      setRemoveTokenAddress('');
    } catch (error: any) {
      setRemoveResult(`Error: ${error.message}`);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleSetThreshold = async () => {
    if (!resolverThreshold) {
      setThresholdResult('Please enter threshold amount');
      return;
    }

    setIsThresholdLoading(true);
    try {
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::set_resolver_threshold`,
          functionArguments: [parseInt(resolverThreshold)],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setThresholdResult(`Threshold updated successfully!`);
      setResolverThreshold('');
    } catch (error: any) {
      setThresholdResult(`Error: ${error.message}`);
    } finally {
      setIsThresholdLoading(false);
    }
  };

  const handleGrantCreator = async () => {
    if (!creatorAddress) {
      setGrantResult('Please enter creator address');
      return;
    }

    setIsGrantLoading(true);
    try {
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::grant_role`,
          functionArguments: ['CREATOR',creatorAddress],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setGrantResult(`Creator role granted to ${creatorAddress} successfully!`);
      setCreatorAddress('');
    } catch (error: any) {
      setGrantResult(`Error: ${error.message}`);
    } finally {
      setIsGrantLoading(false);
    }
  };

  const handleRevokeCreator = async () => {
    if (!revokeAddress) {
      setRevokeResult('Please enter address to revoke');
      return;
    }

    setIsRevokeLoading(true);
    try {
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::revoke_role`,
          functionArguments: ['CREATOR',revokeAddress],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setRevokeResult(`Creator role revoked from ${revokeAddress} successfully!`);
      setRevokeAddress('');
    } catch (error: any) {
      setRevokeResult(`Error: ${error.message}`);
    } finally {
      setIsRevokeLoading(false);
    }
  };

  const handleAdminWithdraw = async () => {
    if (!withdrawPoolId) {
      setWithdrawResult('Please enter pool ID');
      return;
    }
    const tokenType = TOKEN_TYPE_ARGS[detectedToken as keyof typeof TOKEN_TYPE_ARGS];
    setIsWithdrawLoading(true);
    try {
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::admin_withdraw`,
          typeArguments: [tokenType],
          functionArguments: [withdrawPoolId],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setWithdrawResult(`Admin fees withdrawn from Pool #${withdrawPoolId} successfully!`);
      setWithdrawPoolId('');
    } catch (error: any) {
      setWithdrawResult(`Error: ${error.message}`);
    } finally {
      setIsWithdrawLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-red-900 p-3 rounded-lg">
          <Settings className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white">Admin Panel</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Add Token */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-semibold mb-5 text-white">Add Accepted Token</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-medium">Token Address</label>
              <input
                type="text"
                placeholder="0x..."
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none placeholder-zinc-600"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-medium">Minimum Fee</label>
              <input
                type="number"
                placeholder="Enter minimum fee"
                value={minFee}
                onChange={(e) => setMinFee(e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none placeholder-zinc-600"
              />
            </div>
            <button
              onClick={handleAddToken}
              disabled={isLoading || !connected}
              className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/30"
            >
              {isLoading ? 'Adding...' : 'Add Token'}
            </button>
            {!connected && (
              <div className="p-4 rounded-lg text-xs font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
                Please connect your wallet to add tokens
              </div>
            )}
            {addResult && (
              <div className={`mt-6 p-4 rounded-lg text-sm font-semibold text-center ${
                addResult.includes('successfully') 
                  ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' 
                  : 'bg-red-950/50 text-red-400 border border-red-900/30'
              }`}>
                {addResult}
              </div>
            )}
          </div>
        </div>

        {/* Remove Token */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-semibold mb-5 text-white">Remove Token</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-medium">Token Address</label>
              <input
                type="text"
                placeholder="Token Address to Remove"
                value={removeTokenAddress}
                onChange={(e) => setRemoveTokenAddress(e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none placeholder-zinc-600"
              />
            </div>
            <button
              onClick={handleRemoveToken}
              disabled={isLoading || !connected}
              className="w-full py-3 bg-red-900 hover:bg-red-800 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/30 mt-[52px]"
            >
              {isRemoving ? 'Removing...' : 'Remove Token'}
            </button>
            {!connected && (
              <div className="p-4 rounded-lg text-xs font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
                Please connect your wallet to remove tokens
              </div>
            )}
            {removeResult && (
              <div className={`mt-6 p-4 rounded-lg text-sm font-semibold text-center ${
                removeResult.includes('successfully') 
                  ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' 
                  : 'bg-red-950/50 text-red-400 border border-red-900/30'
              }`}>
                {removeResult}
              </div>
            )}
          </div>
        </div>

        {/* Set Resolver Threshold */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-semibold mb-5 text-white">Set Resolver Threshold</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-medium">Threshold Amount</label>
              <input
                type="number"
                placeholder="New Threshold Amount"
                value={resolverThreshold}
                onChange={(e) => setResolverThreshold(e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none placeholder-zinc-600"
              />
            </div>
            <button
              onClick={handleSetThreshold}
              disabled={isLoading || !connected}
              className="w-full py-3 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/30 mt-[52px]"
            >
              {isThresholdLoading ? 'Updating...' : 'Update Threshold'}
            </button>
            {!connected && (
              <div className="p-4 rounded-lg text-xs font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
                Please connect your wallet to update threshold
              </div>
            )}
            {thresholdResult && (
              <div className={`mt-6 p-4 rounded-lg text-sm font-semibold text-center ${
                thresholdResult.includes('successfully') 
                  ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' 
                  : 'bg-red-950/50 text-red-400 border border-red-900/30'
              }`}>
                {thresholdResult}
              </div>
            )}
          </div>
        </div>

        {/* Grant Creator Role */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-semibold mb-5 text-white">Grant Creator Role</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-medium">Creator Address</label>
              <input
                type="text"
                placeholder="0x..."
                value={creatorAddress}
                onChange={(e) => setCreatorAddress(e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none placeholder-zinc-600"
              />
            </div>
            <button
              onClick={handleGrantCreator}
              disabled={isLoading || !connected}
              className="w-full py-3 bg-purple-900 hover:bg-purple-800 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/30 mt-[52px]"
            >
              {isGrantLoading ? 'Granting...' : 'Grant Creator Role'}
            </button>
            {!connected && (
              <div className="p-4 rounded-lg text-xs font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
                Please connect your wallet to grant role
              </div>
            )}
            {grantResult && (
              <div className={`mt-6 p-4 rounded-lg text-sm font-semibold text-center ${
                grantResult.includes('successfully') 
                  ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' 
                  : 'bg-red-950/50 text-red-400 border border-red-900/30'
              }`}>
                {grantResult}
              </div>
            )}
          </div>
        </div>

        {/* Revoke Creator Role */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-semibold mb-5 text-white">Revoke Creator Role</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-medium">Creator Address</label>
              <input
                type="text"
                placeholder="0x..."
                value={revokeAddress}
                onChange={(e) => setRevokeAddress(e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none placeholder-zinc-600"
              />
            </div>
            <button
              onClick={handleRevokeCreator}
              disabled={isRevokeLoading || !connected}
              className="w-full py-3 bg-red-900 hover:bg-red-800 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/30 mt-[52px]"
            >
              {isRevokeLoading ? 'Revoking...' : 'Revoke Creator Role'}
            </button>
            {!connected && (
              <div className="p-4 rounded-lg text-xs font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
                Please connect your wallet to revoke role
              </div>
            )}
            {revokeResult && (
              <div className={`mt-6 p-4 rounded-lg text-sm font-semibold text-center ${
                revokeResult.includes('successfully') 
                  ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' 
                  : 'bg-red-950/50 text-red-400 border border-red-900/30'
              }`}>
                {revokeResult}
              </div>
            )}
          </div>
        </div>

        {/* Admin Withdraw Fees */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-semibold mb-5 text-white">Withdraw Admin Fees</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-medium">Pool ID</label>
              <input
                type="number"
                placeholder="Enter Pool ID"
                value={withdrawPoolId}
                onChange={(e) => handlePoolIdChange(e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none placeholder-zinc-600"
              />
            </div>
            <button
              onClick={handleAdminWithdraw}
              disabled={isWithdrawLoading || !connected}
              className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/30 mt-[52px]"
            >
              {isWithdrawLoading ? 'Withdrawing...' : 'Withdraw Admin Fees'}
            </button>
            {!connected && (
              <div className="p-4 rounded-lg text-xs font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
                Please connect your wallet to withdraw fees
              </div>
            )}
            {withdrawResult && (
              <div className={`mt-6 p-4 rounded-lg text-sm font-semibold text-center ${
                withdrawResult.includes('successfully') 
                  ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' 
                  : 'bg-red-950/50 text-red-400 border border-red-900/30'
              }`}>
                {withdrawResult}
              </div>
            )}
          </div>
        </div>

        {/* Current Settings Display */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-semibold mb-5 text-white">Platform Settings</h3>
          <div className="space-y-4">
            <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
              <div className="text-sm text-zinc-500 mb-1">Accepted Tokens</div>
              <div className="text-white font-mono text-sm">USDC, USDT, APT</div>
            </div>
            <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
              <div className="text-sm text-zinc-500 mb-1">Platform Fee</div>
              <div className="text-white font-semibold">1%</div>
            </div>
            <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
              <div className="text-sm text-zinc-500 mb-1">Current Resolver Threshold</div>
              <div className="text-white font-semibold">1000 tokens</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BecomeResolverTab = () => {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<'become' | 'renew' | 'revoke'>('become');

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
      setResult(`Successfully became a resolver! You can now verify prediction outcomes. 🎉`);
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRenewTimelock = async () => {
    setIsLoading(true);
    try {
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::renew_resolver_timelock`,
          functionArguments: [],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setResult(`Resolver timelock renewed successfully! Extended for another 30 days.`);
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeResolver = async () => {
    setIsLoading(true);
    try {
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::revoke_resolver`,
          functionArguments: [],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setResult(`Successfully revoked resolver role! Your stake has been returned. 🎉`);
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-purple-900 p-3 rounded-lg">
          <Award className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white">Resolver Management</h2>
      </div>

      {/* Action Tabs */}
      <div className="flex gap-2 mb-6 bg-zinc-900 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveSection('become')}
          className={`px-5 py-2.5 rounded-md transition-colors font-semibold ${
            activeSection === 'become'
              ? 'bg-purple-900 text-white'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          Become Resolver
        </button>
        <button
          onClick={() => setActiveSection('renew')}
          className={`px-5 py-2.5 rounded-md transition-colors font-semibold ${
            activeSection === 'renew'
              ? 'bg-purple-900 text-white'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          Renew Timelock
        </button>
        <button
          onClick={() => setActiveSection('revoke')}
          className={`px-5 py-2.5 rounded-md transition-colors font-semibold ${
            activeSection === 'revoke'
              ? 'bg-purple-900 text-white'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          Revoke Role
        </button>
      </div>

      {/* Become Resolver */}
      {activeSection === 'become' && (
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-8 border border-zinc-800">
          <h3 className="text-2xl font-bold text-white mb-6">Become a Resolver</h3>

          <div className="mb-6 p-5 bg-purple-950/30 rounded-lg border border-purple-900/30">
            <div className="flex items-start space-x-3">
              <Trophy className="text-purple-400 mt-0.5 flex-shrink-0" size={20} />
              <div className="text-sm text-purple-200">
                <p className="font-semibold mb-2">Resolver Role Benefits</p>
                <ul className="space-y-1 text-purple-300">
                  <li>• Earn 20% of platform fees for verifying outcomes</li>
                  <li>• Help maintain prediction market integrity</li>
                  <li>• Your stake will be locked for security</li>
                  <li>• Participate in dispute resolution</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-zinc-950 rounded-lg p-5 border border-zinc-800">
              <h3 className="text-white font-semibold mb-3">Requirements</h3>
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="flex justify-between">
                  <span>Minimum Stake Required</span>
                  <span className="text-white font-mono">1000 APT</span>
                </div>
                <div className="flex justify-between">
                  <span>Lock Period</span>
                  <span className="text-white">30 days (renewable)</span>
                </div>
                <div className="flex justify-between">
                  <span>Fee Share</span>
                  <span className="text-emerald-400 font-semibold">20%</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleBecomeResolver}
              disabled={isLoading || !connected}
              className="w-full py-4 bg-gradient-to-r from-purple-900 to-purple-800 hover:from-purple-800 hover:to-purple-700 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/30"
            >
              {isLoading ? 'Processing...' : 'Become Resolver'}
            </button>
            {!connected && (
              <div className="p-4 rounded-lg text-xs font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
                Please connect your wallet to become a resolver
              </div>
            )}
          </div>
        </div>
      )}

      {/* Renew Timelock */}
      {activeSection === 'renew' && (
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-8 border border-zinc-800">
          <h3 className="text-2xl font-bold text-white mb-6">Renew Resolver Timelock</h3>

          <div className="mb-6 p-5 bg-blue-950/30 rounded-lg border border-blue-900/30">
            <p className="text-sm text-blue-200">
              Renew your resolver timelock to continue verifying predictions. This extends your lock period by another 30 days and keeps you eligible to earn resolver fees.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-zinc-950 rounded-lg p-5 border border-zinc-800">
              <h3 className="text-white font-semibold mb-3">Timelock Details</h3>
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="flex justify-between">
                  <span>Extension Period</span>
                  <span className="text-white">30 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Status</span>
                  <span className="text-emerald-400">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Threshold Required</span>
                  <span className="text-white">Must renew before expiry</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleRenewTimelock}
              disabled={isLoading || !connected}
              className="w-full py-4 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/30"
            >
              {isLoading ? 'Renewing...' : 'Renew Timelock'}
            </button>
            {!connected && (
              <div className="p-4 rounded-lg text-xs font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
                Please connect your wallet to renew timelock
              </div>
            )}
          </div>
        </div>
      )}

      {/* Revoke Role */}
      {activeSection === 'revoke' && (
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-8 border border-zinc-800">
          <h3 className="text-2xl font-bold text-white mb-6">Revoke Resolver Role</h3>

          <div className="mb-6 p-5 bg-red-950/30 rounded-lg border border-red-900/30">
            <p className="text-sm text-red-200">
              <strong>Warning:</strong> Revoking your resolver role will return your staked tokens but you'll lose access to resolver privileges and fee earnings. You can only revoke after your timelock has expired.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-zinc-950 rounded-lg p-5 border border-zinc-800">
              <h3 className="text-white font-semibold mb-3">Revocation Conditions</h3>
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="flex justify-between">
                  <span>Timelock Status</span>
                  <span className="text-emerald-400">Expired</span>
                </div>
                <div className="flex justify-between">
                  <span>Stake to Return</span>
                  <span className="text-white font-mono">1000 APT</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Fees</span>
                  <span className="text-yellow-400">Withdraw before revoking</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleRevokeResolver}
              disabled={isLoading || !connected}
              className="w-full py-4 bg-red-900 hover:bg-red-800 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/30"
            >
              {isLoading ? 'Revoking...' : 'Revoke Resolver Role'}
            </button>
            {!connected && (
              <div className="p-4 rounded-lg text-xs font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
                Please connect your wallet to revoke resolver role
              </div>
            )}
          </div>
        </div>
      )}

      {result && (
        <div className={`mt-6 p-4 rounded-lg text-sm font-semibold text-center ${
          result.includes('successfully') 
            ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' 
            : 'bg-red-950/50 text-red-400 border border-red-900/30'
        }`}>
          {result}
        </div>
      )}
    </div>
  );
};

const ResolverActionsTab = () => {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [selectedPoolId, setSelectedPoolId] = useState('');
  const [winningOption, setWinningOption] = useState('');
  const [disputePoolId, setDisputePoolId] = useState('');
  const [resolvePoolId, setResolvePoolId] = useState('');
  const [withdrawPoolId, setWithdrawPoolId] = useState('');
  const [isDisputorFee, setIsDisputorFee] = useState(false);
  const [result, setResult] = useState('');
  const [withdrawResult, setWithdrawResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);
  const [detectedToken, setDetectedToken] = useState<string>('');
  const [activeAction, setActiveAction] = useState<'propose' | 'dispute' | 'resolve' | 'withdraw'>('propose');

  // Detect token type when pool ID changes
  const handlePoolIdChange = (poolId: string) => {
    setWithdrawPoolId(poolId);
    setResult('');
    
    if (poolId) {
      const pool = MOCK_POOLS.find(p => p.id === parseInt(poolId));
      if (pool) {
        setDetectedToken(pool.token);
      } else {
        setDetectedToken('');
      }
    } else {
      setWithdrawPoolId('');
    }
  };

  const handleProposeResolution = async () => {
    if (!selectedPoolId || !winningOption) {
      setResult('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::propose_resolution`,
          functionArguments: [selectedPoolId, winningOption],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setTimeout(() => {
      setResult(`Resolution proposed for Pool #${selectedPoolId}`);
        setSelectedPoolId('');
        setWinningOption('');
        setTimeout(() => setResult(''), 2000);
     }, 1000);
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisputeResolution = async () => {
    if (!disputePoolId) {
      setResult('Please enter pool ID');
      return;
    }

    setIsLoading(true);
    try {
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::dispute_resolution`,
          functionArguments: [disputePoolId],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setTimeout(() => {
        setResult(`Dispute submitted for Pool #${disputePoolId}`);
        setDisputePoolId('');
        setTimeout(() => setResult(''), 2000);
      }, 1000);
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResolvePool = async () => {
    if (!resolvePoolId) {
      setResult('Please enter pool ID');
      return;
    }

    setIsLoading(true);
    try {
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::resolve_pool`,
          functionArguments: [resolvePoolId],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setTimeout(() => {
        setResult(`Pool #${resolvePoolId} resolved successfully! Rewards distributed.`);
        setResolvePoolId('');
        setTimeout(() => setResult(''), 2000);
      }, 1000);
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdrawFees = async () => {
    if (!isDisputorFee && !withdrawPoolId) {
      setWithdrawResult('Please enter pool ID or select disputor fee');
      return;
    }

    setIsWithdrawLoading(true);
    const tokenType = TOKEN_TYPE_ARGS[detectedToken as keyof typeof TOKEN_TYPE_ARGS];
    try {
      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::withdraw_resolver_fee`,
          typeArguments: [tokenType],
          functionArguments: [isDisputorFee, withdrawPoolId],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      const feeType = isDisputorFee ? 'disputor fees' : `fees from Pool #${withdrawPoolId}`;
      setWithdrawResult(`Successfully withdrew ${feeType}!`);
      setWithdrawPoolId('');
    } catch (error: any) {
      setWithdrawPoolId('');
      setWithdrawResult(`Error: ${error.message}`);
    } finally {
      setIsWithdrawLoading(false);
      setWithdrawPoolId('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-900 p-3 rounded-lg">
          <Users className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white">Resolver Actions</h2>
      </div>

      {/* Action Tabs */}
      <div className="flex gap-2 mb-6 bg-zinc-900 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveAction('propose')}
          className={`px-5 py-2.5 rounded-md transition-colors font-semibold ${
            activeAction === 'propose'
              ? 'bg-blue-900 text-white'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          Propose Resolution
        </button>
        <button
          onClick={() => setActiveAction('dispute')}
          className={`px-5 py-2.5 rounded-md transition-colors font-semibold ${
            activeAction === 'dispute'
              ? 'bg-blue-900 text-white'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          Dispute Resolution
        </button>
        <button
          onClick={() => setActiveAction('resolve')}
          className={`px-5 py-2.5 rounded-md transition-colors font-semibold ${
            activeAction === 'resolve'
              ? 'bg-blue-900 text-white'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          Resolve Pool
        </button>
        <button
          onClick={() => setActiveAction('withdraw')}
          className={`px-5 py-2.5 rounded-md transition-colors font-semibold whitespace-nowrap ${
            activeAction === 'withdraw'
              ? 'bg-blue-900 text-white'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          Withdraw Fees
        </button>
      </div>

      {/* Propose Resolution */}
      {activeAction === 'propose' && (
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-8 border border-zinc-800">
          <h3 className="text-2xl font-bold text-white mb-6">Propose Resolution</h3>
          
          <div className="mb-6 p-5 bg-blue-950/30 rounded-lg border border-blue-900/30">
            <p className="text-sm text-blue-200">
              Propose the winning option for a pool. Requires minimum resolver agreement (3 resolvers) to finalize the resolution.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-medium">Pool ID</label>
              <input
                type="number"
                placeholder="Enter Pool ID"
                value={selectedPoolId}
                onChange={(e) => setSelectedPoolId(e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-blue-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-medium">Winning Option</label>
              <input
                type="text"
                placeholder="Enter Winning Option"
                value={winningOption}
                onChange={(e) => setWinningOption(e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-blue-900 focus:outline-none"
              />
            </div>

            <button
              onClick={handleProposeResolution}
              disabled={isLoading || !connected}
              className="w-full py-4 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/30"
            >
              {isLoading ? 'Proposing...' : 'Propose Resolution'}
            </button>
            {!connected && (
              <div className="p-4 rounded-lg text-xs font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
                Please connect your wallet to propose resolution
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dispute Resolution */}
      {activeAction === 'dispute' && (
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-8 border border-zinc-800">
          <h3 className="text-2xl font-bold text-white mb-6">Dispute Resolution</h3>
          
          <div className="mb-6 p-5 bg-orange-950/30 rounded-lg border border-orange-900/30">
            <p className="text-sm text-orange-200">
              Dispute an incorrect resolution within the dispute period. If 50% of resolvers dispute, the resolution is reset and proposers are slashed.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-medium">Pool ID</label>
              <input
                type="number"
                placeholder="Enter Pool ID to dispute"
                value={disputePoolId}
                onChange={(e) => setDisputePoolId(e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-orange-900 focus:outline-none"
              />
            </div>

            <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-500">Dispute Period</span>
                <span className="text-white">40 mins after resolution proposed</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Required Dispute %</span>
                <span className="text-orange-400 font-semibold">50%</span>
              </div>
            </div>

            <button
              onClick={handleDisputeResolution}
              disabled={isLoading || !connected}
              className="w-full py-4 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-900/30"
            >
              {isLoading ? 'Disputing...' : 'Submit Dispute'}
            </button>
            {!connected && (
              <div className="p-4 rounded-lg text-xs font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
                Please connect your wallet to dispute resolution
              </div>
            )}
          </div>
        </div>
      )}

      {/* Resolve Pool */}
      {activeAction === 'resolve' && (
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-8 border border-zinc-800">
          <h3 className="text-2xl font-bold text-white mb-6">Resolve Pool</h3>
          
          <div className="mb-6 p-5 bg-emerald-950/30 rounded-lg border border-emerald-900/30">
            <p className="text-sm text-emerald-200">
              Finalize the pool after the dispute period ends. This distributes rewards to winners and resolvers.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-medium">Pool ID</label>
              <input
                type="number"
                placeholder="Enter Pool ID to resolve"
                value={resolvePoolId}
                onChange={(e) => setResolvePoolId(e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-emerald-900 focus:outline-none"
              />
            </div>

            <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800 space-y-3">
              <h4 className="text-white font-semibold text-sm">Fee Distribution</h4>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Admin Share</span>
                <span className="text-white">50%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Resolvers Share</span>
                <span className="text-emerald-400 font-semibold">40%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Creator Share</span>
                <span className="text-blue-400 font-semibold">10%</span>
              </div>
            </div>

            <button
              onClick={handleResolvePool}
              disabled={isLoading || !connected}
              className="w-full py-4 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/30"
            >
              {isLoading ? 'Resolving...' : 'Resolve Pool'}
            </button>
            {!connected && (
              <div className="p-4 rounded-lg text-xs font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
                Please connect your wallet to resolve pool
              </div>
            )}
          </div>
        </div>
      )}

      {/* Withdraw Fees */}
      {activeAction === 'withdraw' && (
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-8 border border-zinc-800">
          <h3 className="text-2xl font-bold text-white mb-6">Withdraw Resolver Fees</h3>
          
          <div className="mb-6 p-5 bg-purple-950/30 rounded-lg border border-purple-900/30">
            <p className="text-sm text-purple-200">
              Withdraw your earned fees from resolving pools. You can withdraw pool-specific fees or global disputor fees.
            </p>
          </div>

          <div className="space-y-5">
            {/* Fee Type Toggle */}
            <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDisputorFee}
                  onChange={(e) => { setIsDisputorFee(e.target.checked); handlePoolIdChange('3') }}
                  className="w-5 h-5 rounded bg-zinc-800 border-2 border-zinc-700 checked:bg-purple-900 checked:border-purple-900"
                />
                <span className="text-white font-medium">Withdraw Global Disputor Fees (APT)</span>
              </label>
              <p className="text-xs text-zinc-500 mt-2 ml-8">
                Check this to withdraw accumulated disputor fees instead of pool-specific fees
              </p>
            </div>

            {/* Pool ID input - only show if not disputor fee */}
            {!isDisputorFee && (
              <div>
                <label className="block text-sm text-zinc-400 mb-2 font-medium">Pool ID</label>
                <input
                  type="number"
                  placeholder="Enter Pool ID"
                  value={withdrawPoolId}
                  onChange={(e) => handlePoolIdChange(e.target.value)}
                  className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-purple-900 focus:outline-none"
                />
              </div>
            )}

            <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800 space-y-3">
              <h4 className="text-white font-semibold text-sm">Fee Information</h4>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Fee Type</span>
                <span className="text-white font-mono">
                  {isDisputorFee ? 'Global Disputor Fees' : 'Pool-Specific Resolver Fees'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Token</span>
                <span className="text-white">
                  {isDisputorFee ? 'APT' : 'Pool Token'}
                </span>
              </div>
              {/* <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Estimated Available</span>
                <span className="text-emerald-400 font-semibold">Check contract</span>
              </div> */}
            </div>

            <button
              onClick={handleWithdrawFees}
              disabled={isWithdrawLoading || !connected}
              className="w-full py-4 bg-gradient-to-r from-purple-900 to-purple-800 hover:from-purple-800 hover:to-purple-700 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/30"
            >
              {isWithdrawLoading ? 'Withdrawing...' : 'Withdraw Fees'}
            </button>
            {!connected && (
              <div className="p-4 rounded-lg text-xs font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
                Please connect your wallet to withdraw fees
              </div>
            )}

            {withdrawResult && (
              <div className={`p-4 rounded-lg text-sm font-semibold text-center ${
                withdrawResult.includes('successfully') 
                  ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' 
                  : 'bg-red-950/50 text-red-400 border border-red-900/30'
              }`}>
                {withdrawResult}
              </div>
            )}
          </div>
        </div>
      )}

      {result && (
        <div className={`mt-6 p-4 rounded-lg text-sm font-semibold text-center ${
          result.includes('successfully') || result.includes('proposed') || result.includes('submitted') || result.includes('resolved')
            ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' 
            : 'bg-red-950/50 text-red-400 border border-red-900/30'
        }`}>
          {result}
        </div>
      )}
    </div>
  );
};

const UserWithdrawTab = () => {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [withdrawPoolId, setWithdrawPoolId] = useState('');
  const [detectedToken, setDetectedToken] = useState<string>('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Detect token type when pool ID changes
  const handlePoolIdChange = (poolId: string) => {
    setWithdrawPoolId(poolId);
    setResult('');
    
    if (poolId) {
      const pool = MOCK_POOLS.find(p => p.id === parseInt(poolId));
      if (pool) {
        setDetectedToken(pool.token);
      } else {
        setDetectedToken('');
      }
    } else {
      setDetectedToken('');
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawPoolId) {
      setResult('Please enter a pool ID');
      return;
    }

    if (!detectedToken) {
      setResult('Pool not found. Please check the pool ID.');
      return;
    }

    setIsLoading(true);
    try {
      const tokenType = TOKEN_TYPE_ARGS[detectedToken as keyof typeof TOKEN_TYPE_ARGS];

      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::user_withdraw`,
          typeArguments: [tokenType],
          functionArguments: [parseInt(withdrawPoolId)],
        },
      };

      const response = await signAndSubmitTransaction(payload);
      setResult(`Withdrawal successful! Your winnings have been transferred.`);
      setWithdrawPoolId('');
      setDetectedToken('');
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-emerald-900 p-3 rounded-lg">
          <DollarSign className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white">Withdraw Winnings</h2>
      </div>

      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-8 border border-zinc-800">
        <div className="mb-6 p-5 bg-emerald-950/30 rounded-lg border border-emerald-900/30">
          <div className="flex items-start space-x-3">
            <Trophy className="text-emerald-400 mt-0.5 flex-shrink-0" size={20} />
            <div className="text-sm text-emerald-200">
              <p className="font-semibold mb-2">Withdraw Your Winnings</p>
              <p className="text-emerald-300">
                Enter the pool ID of a resolved market where you placed a winning prediction. 
                You can only withdraw once per pool, and only if you're eligible (placed a winning bet).
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm text-zinc-400 mb-2 font-medium">Pool ID</label>
            <input
              type="number"
              placeholder="Enter Pool ID"
              value={withdrawPoolId}
              onChange={(e) => handlePoolIdChange(e.target.value)}
              className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-emerald-900 focus:outline-none"
            />
            {withdrawPoolId && detectedToken && (
              <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                ✓ Pool found - Token type: {detectedToken}
              </p>
            )}
            {withdrawPoolId && !detectedToken && (
              <p className="text-xs text-red-400 mt-2">
                Pool not found. Please check the pool ID.
              </p>
            )}
          </div>

          <div className="bg-zinc-950 rounded-lg p-5 border border-zinc-800">
            <h3 className="text-white font-semibold mb-3 text-sm">Withdrawal Information</h3>
            <div className="space-y-2 text-sm text-zinc-400">
              <div className="flex justify-between">
                <span>Pool Must Be</span>
                <span className="text-white">Resolved</span>
              </div>
              <div className="flex justify-between">
                <span>Your Prediction</span>
                <span className="text-emerald-400 font-semibold">Must Be Winning Option</span>
              </div>
              <div className="flex justify-between">
                <span>Withdrawals Per Pool</span>
                <span className="text-white">Once Only</span>
              </div>
              {detectedToken && (
                <div className="flex justify-between pt-2 border-t border-zinc-800">
                  <span>Withdrawal Token</span>
                  <span className="text-emerald-400 font-semibold">{detectedToken}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleWithdraw}
            disabled={isLoading || !connected}
            className="w-full py-4 bg-gradient-to-r from-emerald-900 to-emerald-800 hover:from-emerald-800 hover:to-emerald-700 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50"
          >
            {isLoading ? 'Processing Withdrawal...' : 'Withdraw Winnings'}
          </button>

          {!connected && (
            <div className="p-4 rounded-lg text-xs font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
              Please connect your wallet to withdraw
            </div>
          )}

          {result && (
            <div className={`p-4 rounded-lg text-sm font-semibold text-center ${
              result.includes('successful') 
                ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' 
                : 'bg-red-950/50 text-red-400 border border-red-900/30'
            }`}>
              {result}
            </div>
          )}
        </div>

        {/* Sample Eligible Pools (Mock Data) */}
        <div className="mt-8 pt-8 border-t border-zinc-800">
          <h3 className="text-white font-semibold mb-4">Your Eligible Withdrawals</h3>
          <div className="space-y-3">
            <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800 hover:border-emerald-900/50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium text-sm">Pool #1 - MetaMask Token Launch</p>
                  <p className="text-zinc-500 text-xs mt-1">Predicted: Yes • Status: Resolved</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-bold">+125 APT</p>
                  <p className="text-zinc-600 text-xs">Available</p>
                </div>
              </div>
            </div>
            <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800 opacity-50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium text-sm">Pool #4 - Bitcoin $100k</p>
                  <p className="text-zinc-500 text-xs mt-1">Predicted: Yes • Status: Resolved</p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-500 font-bold">Already Withdrawn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const CreatePoolTab = ({ onPoolCreated }: { onPoolCreated: (pool: any) => void }) => {
  const { account, connected, signAndSubmitTransaction } = useWallet();

  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('Crypto');
  const [options, setOptions] = useState(['Yes', 'No']);
  const [startTime, setStartTime] = useState('');
  const [bettingCutoff, setBettingCutoff] = useState('');
  const [resolveDelay, setResolveDelay] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [endTime, setEndTime] = useState('');
  const [selectedToken, setSelectedToken] = useState('APT');
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState('');

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

  const handleCreate = async () => {
    if (!question || !startTime || !bettingCutoff || !resolveDelay) {
      setResult('Please fill in all fields');
      return;
    }

    if (options.some(opt => !opt.trim())) {
      setResult('Please fill in all options');
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
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-8 border border-zinc-800">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-red-900 p-3 rounded-lg">
            <Plus className="text-white" size={24} />
          </div>
          <h2 className="text-3xl font-bold text-white">Create Prediction Pool</h2>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none"
              >
                <option>Crypto</option>
                <option>Politics</option>
                <option>Tech</option>
                <option>Sports</option>
                <option>Earnings</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2 font-medium">Token</label>
              <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none"
              >
                <option value="APT">APT (Aptos Coin)</option>
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2 font-medium">Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Will Bitcoin reach $100k in 2025?"
              className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none h-28 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2 font-medium">Image URL (optional)</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2 font-medium">Options</label>
            {options.map((opt, idx) => (
              <div key={idx} className="flex items-center space-x-2 mb-2">
                <input
                    type="text"
                    value={opt}
                    onChange={(e) => updateOption(idx, e.target.value)}
                    placeholder={`Option ${idx + 1}`}
                  className="w-full bg-zinc-800 text-zinc-400 px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none mb-3"
                />
                {options.length > 2 && (
                  <button
                    onClick={() => removeOption(idx)}
                    className="px-3 py-2 bg-red-900 text-zinc-400 rounded-md hover:bg-zinc-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addOption}
              className="mt-2 px-4 py-2 bg-red-900 text-zinc-400 rounded-md hover:bg-zinc-700"
            >
              Add Option
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-2 font-medium">Start Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-2 font-medium">Betting Cutoff (hours before start)</label>
              <input
                type="number"
                value={bettingCutoff}
                onChange={(e) => setBettingCutoff(e.target.value)}
                placeholder="e.g., 2"
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-2 font-medium">Resolve Delay (hours after start)</label>
              <input
                type="number"
                value={resolveDelay}
                onChange={(e) => setResolveDelay(e.target.value)}
                placeholder="e.g., 24"
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border-2 border-zinc-700 focus:border-red-900 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleCreate}
            disabled={isLoading || !connected}
            className="w-full py-4 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Pool...' : 'Create Prediction Pool'}
          </button>
          {!connected && (
            <div className="p-4 rounded-lg text-sm font-semibold text-center bg-yellow-950/50 text-yellow-400 border border-yellow-900/30">
              Please connect your wallet to create a pool
            </div>
          )}

          {result && (
            <div className={`p-4 rounded-lg text-sm font-semibold text-center ${
              result.includes('success') ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' : 'bg-red-950/50 text-red-400 border border-red-900/30'
            }`}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ResolversTab = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-8 border border-zinc-800">
        <h2 className="text-2xl font-bold text-white mb-6">Top Question Creators</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 text-sm">
                <th className="text-left py-4 px-4">Rank</th>
                <th className="text-left py-4 px-4">Creator Address</th>
                <th className="text-left py-4 px-4">Trading Vol.</th>
                <th className="text-left py-4 px-4">No. of Predictors</th>
              </tr>
            </thead>
            <tbody>
              {TOP_CREATORS.map((creator) => (
                <tr key={creator.rank} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="py-5 px-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      creator.rank === 1 ? 'bg-yellow-600 text-white' :
                      creator.rank === 2 ? 'bg-zinc-500 text-white' :
                      creator.rank === 3 ? 'bg-orange-700 text-white' :
                      'bg-zinc-800 text-zinc-400'
                    }`}>
                      {creator.rank}
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <div>
                      <div className="text-white font-semibold">{creator.name}</div>
                      <div className="text-zinc-500 text-sm font-mono">{creator.address}</div>
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <div className="text-white font-semibold">${creator.volume.toLocaleString()}</div>
                  </td>
                  <td className="py-5 px-4">
                    <div className="text-white font-semibold">{creator.predictors.toLocaleString()}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


const PitchDeckSection = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Prediction Markets</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          Gimodelo democratizes forecasting by enabling communities, DAOs, and individuals to create trustless prediction markets on Aptos blockchain
        </p>
      </div>

      {/* Problem Statement */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-10 border border-zinc-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-900 p-3 rounded-lg">
            <TrendingUp className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-bold text-white">The Problem</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-zinc-300">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Traditional Prediction Markets</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Centralized control over market creation and resolution</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Limited transparency in outcome verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>High barriers to entry for market creators</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Gaming through front-running and information asymmetry</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Limited Use Cases</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>DAOs lack decision-making forecasting tools</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Communities cannot create custom prediction markets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>No incentive structures for accurate forecasting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Existing platforms focus only on mainstream events</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Solution */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-10 border border-zinc-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-emerald-900 p-3 rounded-lg">
            <Trophy className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-bold text-white">Our Solution</h2>
        </div>
        <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
          Gimodelo is a fully decentralized prediction market protocol built on Aptos that empowers anyone to create, participate in, and resolve prediction markets with complete transparency and fairness.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
            <div className="bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users size={24} className="text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Community Governed</h3>
            <p className="text-sm text-zinc-400">Anyone can create prediction markets. Communities control their own forecasting ecosystems.</p>
          </div>
          <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
            <div className="bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Award size={24} className="text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Decentralized Resolution</h3>
            <p className="text-sm text-zinc-400">Multi-resolver consensus with dispute mechanisms ensures accurate outcomes without central authority.</p>
          </div>
          <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
            <div className="bg-red-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Flame size={24} className="text-red-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Blind Prediction</h3>
            <p className="text-sm text-zinc-400">Hidden odds prevent gaming. Success depends purely on forecasting accuracy, not crowd following.</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-white text-center">How Gimodelo Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-950/30 to-zinc-950 rounded-xl p-8 border border-purple-900/30">
            <div className="text-5xl font-bold text-purple-400 mb-4">01</div>
            <h3 className="text-xl font-bold text-white mb-3">Creators</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>• Design prediction pools on any topic</li>
              <li>• Set parameters and accepted tokens</li>
              <li>• Earn 10% of platform fees</li>
              <li>• Build markets for their communities</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-950/30 to-zinc-950 rounded-xl p-8 border border-blue-900/30">
            <div className="text-5xl font-bold text-blue-400 mb-4">02</div>
            <h3 className="text-xl font-bold text-white mb-3">Predictors</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>• Stake tokens on predicted outcomes</li>
              <li>• Winners share entire pool proportionally</li>
              <li>• Blind betting prevents gaming</li>
              <li>• Pure skill-based forecasting</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-emerald-950/30 to-zinc-950 rounded-xl p-8 border border-emerald-900/30">
            <div className="text-5xl font-bold text-emerald-400 mb-4">03</div>
            <h3 className="text-xl font-bold text-white mb-3">Resolvers</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>• Verify outcomes with consensus mechanism</li>
              <li>• Earn 40% of platform fees</li>
              <li>• Dispute system ensures accuracy</li>
              <li>• Staked tokens guarantee honesty</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-10 border border-zinc-800">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Unlimited Use Cases</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="bg-red-900/20 w-14 h-14 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🏛️</span>
            </div>
            <h4 className="text-white font-semibold">DAOs</h4>
            <p className="text-sm text-zinc-400">Forecast governance proposals, treasury decisions, and protocol upgrades</p>
          </div>
          <div className="space-y-3">
            <div className="bg-blue-900/20 w-14 h-14 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🏀</span>
            </div>
            <h4 className="text-white font-semibold">Sports</h4>
            <p className="text-sm text-zinc-400">Community-driven markets for games, tournaments, and player performance</p>
          </div>
          <div className="space-y-3">
            <div className="bg-emerald-900/20 w-14 h-14 rounded-xl flex items-center justify-center">
              <span className="text-3xl">📈</span>
            </div>
            <h4 className="text-white font-semibold">Finance</h4>
            <p className="text-sm text-zinc-400">Token prices, earnings reports, economic indicators, and market trends</p>
          </div>
          <div className="space-y-3">
            <div className="bg-purple-900/20 w-14 h-14 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🌍</span>
            </div>
            <h4 className="text-white font-semibold">Communities</h4>
            <p className="text-sm text-zinc-400">Local events, trends, decisions affecting your community</p>
          </div>
        </div>
      </div>

      {/* Why Aptos */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-10 border border-zinc-800">
        <h2 className="text-3xl font-bold text-white mb-6">Built on Aptos</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-zinc-300 mb-6 leading-relaxed">
              Aptos provides the perfect foundation for Gimodelo with its high throughput, low latency, and robust Move programming language ensuring secure smart contract execution.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-900/30 p-2 rounded-lg mt-1">
                  <ChevronRight size={16} className="text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Lightning Fast</h4>
                  <p className="text-sm text-zinc-400">Sub-second finality enables real-time prediction markets</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-900/30 p-2 rounded-lg mt-1">
                  <ChevronRight size={16} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Cost Efficient</h4>
                  <p className="text-sm text-zinc-400">Low transaction fees make micro-predictions viable</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-900/30 p-2 rounded-lg mt-1">
                  <ChevronRight size={16} className="text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Secure by Design</h4>
                  <p className="text-sm text-zinc-400">Move language prevents common smart contract vulnerabilities</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-white font-semibold mb-4">Key Advantages</h3>
            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex justify-between p-3 bg-zinc-900 rounded-lg">
                <span>Transaction Speed</span>
                <span className="text-emerald-400 font-semibold">&lt;1 second</span>
              </div>
              <div className="flex justify-between p-3 bg-zinc-900 rounded-lg">
                <span>Theoretical TPS</span>
                <span className="text-blue-400 font-semibold">160,000+</span>
              </div>
              <div className="flex justify-between p-3 bg-zinc-900 rounded-lg">
                <span>Smart Contract Language</span>
                <span className="text-purple-400 font-semibold">Move</span>
              </div>
              <div className="flex justify-between p-3 bg-zinc-900 rounded-lg">
                <span>Parallel Execution</span>
                <span className="text-red-400 font-semibold">Yes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Economics */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-10 border border-zinc-800">
        <h2 className="text-3xl font-bold text-white mb-6">Sustainable Economics</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-950/20 rounded-xl p-6 border border-red-900/30 text-center">
            <div className="text-4xl font-bold text-red-400 mb-2">50%</div>
            <div className="text-white font-semibold mb-1">Platform</div>
            <div className="text-sm text-zinc-400">Development & maintenance</div>
          </div>
          <div className="bg-blue-950/20 rounded-xl p-6 border border-blue-900/30 text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">40%</div>
            <div className="text-white font-semibold mb-1">Resolvers</div>
            <div className="text-sm text-zinc-400">Outcome verification</div>
          </div>
          <div className="bg-purple-950/20 rounded-xl p-6 border border-purple-900/30 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">10%</div>
            <div className="text-white font-semibold mb-1">Creators</div>
            <div className="text-sm text-zinc-400">Market creation rewards</div>
          </div>
        </div>
        <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-white font-semibold mb-3">Fair & Transparent</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Only 1% platform fee on total pool stakes ensures competitive odds while incentivizing all participants. Winners share 99% of the pool, creating the most favorable conditions for accurate forecasters.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-2xl p-12 text-center border border-red-700">
        <h2 className="text-4xl font-bold text-white mb-4">Join the Future of Forecasting</h2>
        <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
          Whether you're a DAO looking to gauge community sentiment, a creator wanting to monetize your insights, or a forecaster seeking fair markets, Gimodelo is built for you.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="px-8 py-4 bg-white text-red-900 rounded-lg font-bold hover:bg-zinc-100 transition-all shadow-lg">
            Start Predicting
          </button>
          <button className="px-8 py-4 bg-zinc-900 text-white rounded-lg font-bold hover:bg-zinc-800 transition-all border border-zinc-700 opacity-70 cursor-not-allowed">
            Read Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

const HowItWorksPage = () => {
  const [activeExample, setActiveExample] = useState('yes');

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
            How preDix Works
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            preDix operates through a structured ecosystem with defined roles and transparent economics, creating a sustainable prediction market platform.
          </p>
        </div>

        {/* Core Roles Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Users className="text-red-500" size={32} />
            Core Roles
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Creators */}
            <div className="bg-gradient-to-br from-purple-950/40 to-zinc-900 border border-purple-900/30 rounded-2xl p-8 hover:border-purple-700/50 transition-all">
              <div className="bg-purple-900/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Target className="text-purple-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-300">Creators</h3>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Design and launch prediction pools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Set pool parameters (question, accepted tokens, options)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>Earn <span className="text-purple-400 font-bold">10%</span> of platform fees for successful pool creation</span>
                </li>
              </ul>
            </div>

            {/* Resolvers */}
            <div className="bg-gradient-to-br from-emerald-950/40 to-zinc-900 border border-emerald-900/30 rounded-2xl p-8 hover:border-emerald-700/50 transition-all">
              <div className="bg-emerald-900/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="text-emerald-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-300">Resolvers</h3>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>Verify and confirm prediction outcomes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>Provide decentralized oracle services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>Receive <span className="text-emerald-400 font-bold">40%</span> of platform fees for accurate resolution</span>
                </li>
              </ul>
            </div>

            {/* Users/Predictors */}
            <div className="bg-gradient-to-br from-blue-950/40 to-zinc-900 border border-blue-900/30 rounded-2xl p-8 hover:border-blue-700/50 transition-all">
              <div className="bg-blue-900/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="text-blue-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-300">Users/Predictors</h3>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Stake tokens on their chosen outcomes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Compete for proportional winnings based on accuracy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Share the entire pool based on stake proportion</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pool Creation Example */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Coins className="text-red-500" size={32} />
            Pool Creation Example
          </h2>
          
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-8">
            <div className="bg-zinc-950/50 rounded-xl p-6 mb-6 border border-red-900/30">
              <p className="text-2xl font-semibold text-white mb-4">
                "Will MetaMask launch its own token this year?"
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">Accepted Token:</span>
                  <span className="text-emerald-400 font-bold">USDC</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-6">
                <h4 className="text-xl font-bold text-emerald-400 mb-2">Option 1: YES</h4>
                <p className="text-zinc-400 text-sm">Stake on positive outcome</p>
              </div>
              <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-6">
                <h4 className="text-xl font-bold text-red-400 mb-2">Option 2: NO</h4>
                <p className="text-zinc-400 text-sm">Stake on negative outcome</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-950/20 border border-purple-900/30 rounded-xl p-4">
                <p className="text-zinc-400 text-sm mb-1">Creator Reward</p>
                <p className="text-purple-300 font-bold">10% of total fees</p>
              </div>
              <div className="bg-blue-950/20 border border-blue-900/30 rounded-xl p-4">
                <p className="text-zinc-400 text-sm mb-1">Resolver Reward</p>
                <p className="text-blue-300 font-bold">40% of total fees</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Reward System */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <PieChart className="text-red-500" size={32} />
            Dynamic Reward System
          </h2>
          
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-8">
            <div className="bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-blue-900/30 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                <TrendingUp size={24} />
                Starting Point
              </h3>
              <p className="text-zinc-300 leading-relaxed">
                At the start, all options have <span className="text-blue-400 font-bold">equal probability</span> of winning. As users stake on different options, these percentages dynamically shift based on the total amount staked on each side. The more funds staked on an option, the higher its displayed percentage becomes.
              </p>
            </div>

            <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
              Participants cannot predict exact winnings because payouts depend on:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-zinc-950/50 rounded-xl p-6 border border-zinc-800">
                <DollarSign className="text-yellow-500 mb-3" size={28} />
                <h4 className="font-bold text-white mb-2">Total Pool Size</h4>
                <p className="text-zinc-400 text-sm">All staked funds combined</p>
              </div>
              <div className="bg-zinc-950/50 rounded-xl p-6 border border-zinc-800">
                <Award className="text-orange-500 mb-3" size={28} />
                <h4 className="font-bold text-white mb-2">Distribution</h4>
                <p className="text-zinc-400 text-sm">How much was staked on each side</p>
              </div>
              <div className="bg-zinc-950/50 rounded-xl p-6 border border-zinc-800">
                <TrendingUp className="text-emerald-500 mb-3" size={28} />
                <h4 className="font-bold text-white mb-2">Your Stake</h4>
                <p className="text-zinc-400 text-sm">Proportion within winning option</p>
              </div>
            </div>

            {/* Interactive Example */}
            <div className="bg-gradient-to-br from-red-950/20 to-zinc-950 border border-red-900/30 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-red-400">Example Scenario</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-zinc-950/50 rounded-lg p-4">
                  <span className="text-zinc-400">Total Pool</span>
                  <span className="text-white font-bold text-2xl">$10,000</span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveExample('yes')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      activeExample === 'yes'
                        ? 'bg-emerald-950/40 border-emerald-700'
                        : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-emerald-400 font-bold text-xl mb-2">YES Stakers</div>
                    <div className="text-white text-3xl font-bold">$3,000</div>
                  </button>
                  <button
                    onClick={() => setActiveExample('no')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      activeExample === 'no'
                        ? 'bg-red-950/40 border-red-700'
                        : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-red-400 font-bold text-xl mb-2">NO Stakers</div>
                    <div className="text-white text-3xl font-bold">$7,000</div>
                  </button>
                </div>

                {activeExample === 'yes' && (
                  <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-6 animate-fade-in">
                    <h4 className="text-emerald-300 font-bold text-lg mb-3">If "YES" Wins:</h4>
                    <p className="text-zinc-300 mb-4">
                      The $3,000 "YES" stakers share the entire pool minus fees
                    </p>
                    <div className="flex items-center justify-between bg-zinc-950/50 rounded-lg p-4">
                      <span className="text-zinc-400">Winner Pool Share</span>
                      <span className="text-emerald-400 font-bold text-2xl">$9,900</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-2">($10,000 - 1% platform fee)</p>
                  </div>
                )}

                {activeExample === 'no' && (
                  <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-6 animate-fade-in">
                    <h4 className="text-red-300 font-bold text-lg mb-3">If "NO" Wins:</h4>
                    <p className="text-zinc-300 mb-4">
                      The $7,000 "NO" stakers share the entire pool minus fees
                    </p>
                    <div className="flex items-center justify-between bg-zinc-950/50 rounded-lg p-4">
                      <span className="text-zinc-400">Winner Pool Share</span>
                      <span className="text-red-400 font-bold text-2xl">$9,900</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-2">($10,000 - 1% platform fee)</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fee Structure */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <DollarSign className="text-red-500" size={32} />
            Fee Structure (1% of Total Pool)
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-950/40 to-zinc-900 border border-red-900/30 rounded-2xl p-8 text-center">
              <div className="text-6xl font-bold text-red-400 mb-3">50%</div>
              <h3 className="text-xl font-bold text-white mb-2">to Admin</h3>
              <p className="text-zinc-400 text-sm">Platform maintenance and development</p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-950/40 to-zinc-900 border border-emerald-900/30 rounded-2xl p-8 text-center">
              <div className="text-6xl font-bold text-emerald-400 mb-3">40%</div>
              <h3 className="text-xl font-bold text-white mb-2">to Resolvers</h3>
              <p className="text-zinc-400 text-sm">Outcome verification incentives</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-950/40 to-zinc-900 border border-purple-900/30 rounded-2xl p-8 text-center">
              <div className="text-6xl font-bold text-purple-400 mb-3">10%</div>
              <h3 className="text-xl font-bold text-white mb-2">to Creators</h3>
              <p className="text-zinc-400 text-sm">Pool creation rewards</p>
            </div>
          </div>
        </div>

        {/* Blind Prediction Environment */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Shield className="text-red-500" size={32} />
            Blind Prediction Environment
          </h2>
          
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-8">
            <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
              Users stake without knowing key information, creating pure forecasting markets where success depends entirely on predictive accuracy:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-zinc-950/50 rounded-xl p-6 border border-zinc-800 text-center">
                <EyeOff className="text-red-500 mx-auto mb-4" size={40} />
                <h4 className="font-bold text-white mb-2">Hidden Distributions</h4>
                <p className="text-zinc-400 text-sm">Current voting distributions are concealed</p>
              </div>
              
              <div className="bg-zinc-950/50 rounded-xl p-6 border border-zinc-800 text-center">
                <EyeOff className="text-red-500 mx-auto mb-4" size={40} />
                <h4 className="font-bold text-white mb-2">Unknown Payouts</h4>
                <p className="text-zinc-400 text-sm">Potential payout ratios remain unknown</p>
              </div>
              
              <div className="bg-zinc-950/50 rounded-xl p-6 border border-zinc-800 text-center">
                <EyeOff className="text-red-500 mx-auto mb-4" size={40} />
                <h4 className="font-bold text-white mb-2">Anonymous Positions</h4>
                <p className="text-zinc-400 text-sm">Other participants' positions are hidden</p>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-red-950/30 to-orange-950/30 border border-red-900/30 rounded-xl p-6">
              <p className="text-center text-zinc-300">
                <span className="text-red-400 font-bold">No gaming the system.</span> No following crowds. Just pure predictive skill and market insight.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedPool, setSelectedPool] = useState(null);
  const [pools, setPools] = useState(MOCK_POOLS);

  const handlePoolCreated = ({ newPool }: { newPool: any }) => {
    setPools([newPool, ...pools]);
    setActiveTab('explore');
  };

  // Custom styles for wallet selector
  const walletSelectorStyles = `
    .wallet-button,
    .ant-btn-primary {
      background: linear-gradient(to right, #7f1d1d, #991b1b) !important;
      border: none !important;
      color: white !important;
    }
    
    .wallet-button:hover,
    .ant-btn-primary:hover {
      background: linear-gradient(to right, #991b1b, #b91c1c) !important;
    }
    
    .wallet-selector button {
      background: linear-gradient(to right, #7f1d1d, #991b1b) !important;
      border: none !important;
    }
    
    .wallet-selector button:hover {
      background: linear-gradient(to right, #991b1b, #b91c1c) !important;
    }
  `;


  return (
    <div className="min-h-screen bg-black text-white">
      <style>{walletSelectorStyles}</style>
      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-red-600 to-red-800 p-2 rounded-lg">
                <Trophy className="text-white" size={28} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                Gimodelo
              </h1>
            </div>
            <WalletSelector />
            {/* <button className="bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-lg shadow-red-900/30">
              Connect Wallet
            </button> */}
          </div>
        </div>
      </header>

      {/* Navigation */}
      {!selectedPool && (
        <nav className="border-b border-zinc-900 bg-zinc-950/30">
          <div className="container mx-auto px-6">
            <div className="flex gap-1 text-sm">
              {['explore', 'admin', 'create event', 'become a resolver', 'resolver', 'user withdraw', 'leaderboard', 'Docs', 'how it works'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-4 font-semibold capitalize transition-all relative ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-red-400"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {selectedPool ? (
          <PoolDetailView pool={selectedPool} onBack={() => setSelectedPool(null)} />
        ) : (
          <>
            {activeTab === 'explore' && <MarketExplorer onPoolSelect={setSelectedPool} />}
            {activeTab === 'create event' && <CreatePoolTab onPoolCreated={handlePoolCreated} />}
            {activeTab === 'admin' && <AdminPanel />}
            {activeTab === 'resolver' && <ResolverActionsTab />}
            {activeTab === 'become a resolver' && <BecomeResolverTab />}
            {activeTab === 'leaderboard' && <ResolversTab />}
            {activeTab === 'user withdraw' && <UserWithdrawTab />}
            {activeTab === 'Docs' && <PitchDeckSection />}
            {activeTab === 'how it works' && <HowItWorksPage />}
          </>
        )}
      </main>
    </div>
  );
};

export default App;