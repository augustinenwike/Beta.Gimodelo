"use client";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import React, { useState } from 'react';
import { Plus, TrendingUp, Users, Trophy, Clock, DollarSign, Search, ArrowLeft, Award, ChevronRight, Flame, BarChart3, Settings } from 'lucide-react';

// Mock Backend Data
const MOCK_POOLS = [
  {
    id: 1,
    question: "Will MetaMask launch its own token in 2025?",
    category: "Crypto",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&h=300&fit=crop",
    options: ["Yes", "No"],
    percentages: [68, 32],
    volume: 125430,
    endTime: "2025-12-31T23:59:59",
    creator: "0xabc...def1",
    resolver: "0x789...abc2",
    status: "active",
    token: "USDC",
    predictors: 1247
  },
  {
    id: 2,
    question: "US government shutdown by October 2025?",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=300&fit=crop",
    options: ["Yes", "No"],
    percentages: [79, 21],
    volume: 98234,
    endTime: "2025-10-01T00:00:00",
    creator: "0x123...456a",
    resolver: "0xdef...456b",
    status: "active",
    token: "APT",
    predictors: 892
  },
  {
    id: 6,
    question: "Will NIKE beat quarterly earnings?",
    category: "Earnings",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    options: ["Yes", "No"],
    percentages: [82, 18],
    volume: 67892,
    endTime: "2025-11-15T16:00:00",
    creator: "0xdef...789b",
    resolver: "0x456...def3",
    status: "active",
    token: "USDT",
    predictors: 654
  },
  {
    id: 4,
    question: "Bitcoin above $100,000 by end of 2025?",
    category: "Crypto",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop",
    options: ["Yes", "No"],
    percentages: [55, 45],
    volume: 234567,
    endTime: "2025-12-31T23:59:59",
    creator: "0x789...abc2",
    resolver: "0xabc...789c",
    status: "active",
    token: "APT",
    predictors: 2134
  },
  {
    id: 5,
    question: "Man Utd vs Liverpool?",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&h=300&fit=crop",
    options: ["Man utd", "Liverpool", "Draw"],
    percentages: [33.3,33.3,33.3],
    volume: 45678,
    endTime: "2025-12-31T23:59:59",
    creator: "0x456...def3",
    resolver: "0x123...456d",
    status: "active",
    token: "APT",
    predictors: 423
  },
  {
    id: 3,
    question: "Champions League winners 2025?",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=300&fit=crop",
    options: ["Barca", "Real madrid", "Bayern", "Inter", "Liverpool", "Man city", "PSG", "Aresnal","Napoli","Another team"],
    percentages: [18, 23, 13, 5, 9, 7, 12, 7, 5, 1],
    volume: 1000,
    endTime: "2025-10-31T23:59:59",
    creator: "0xspo...rts1",
    resolver: "0xspo...rts2",
    status: "active",
    token: "APT",
    predictors: 1567
  }
];

const TOP_CREATORS = [
  { rank: 1, name: "Domestic_Bogeyman_ez", address: "0x897f60...427ef8", volume: 55225.404, predictors: 927 },
  { rank: 2, name: "0xbabywhale", address: "0x5c00d7...8cd0b5", volume: 43181.079, predictors: 962 },
  { rank: 3, name: "Geraldgzus", address: "0x57392a...bd1808", volume: 36489.023, predictors: 817 },
  { rank: 4, name: "Rolex", address: "0x633ef9...5b7fbd", volume: 30315.701, predictors: 854 }
];

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
            <span>${(pool.volume / 1000).toFixed(1)}k</span>
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

  const categories = ['All', 'Trending', 'Crypto', 'Politics', 'Tech', 'Sports', 'Earnings'];

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
              <p className="text-white text-3xl font-bold">$661k</p>
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
              <p className="text-white text-3xl font-bold">7.9k</p>
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

      const payload: InputTransactionData = {
        data: {
          function: `${moduleAddress}::${moduleName}::stake_pool`,
          typeArguments: [tokenType],
          functionArguments: [
            parseInt(poolId),
            parseInt(stakeAmount),
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
                  ${((pool.volume * pool.percentages[idx]) / 100 / 1000).toFixed(1)}k staked
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
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-500">Potential Return</span>
                  <span className="text-emerald-400 font-bold">${potentialWinnings}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-600">Platform Fee (1%)</span>
                  <span className="text-zinc-600">${((parseFloat(stakeAmount) || 0) * 0.01).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleStake}
                className="w-full py-4 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50"
              >
                Place Prediction
              </button>

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
  const [addResult, setAddResult] = useState('');
  const [removeResult, setRemoveResult] = useState('');
  const [thresholdResult, setThresholdResult] = useState('');
  const [grantResult, setGrantResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isThresholdLoading, setIsThresholdLoading] = useState(false);
  const [isGrantLoading, setIsGrantLoading] = useState(false);

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
              disabled={isLoading}
              className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/30"
            >
              {isLoading ? 'Adding...' : 'Add Token'}
            </button>
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
              disabled={isLoading}
              className="w-full py-3 bg-red-900 hover:bg-red-800 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/30 mt-[52px]"
            >
              {isRemoving ? 'Removing...' : 'Remove Token'}
            </button>
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
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/30 mt-[52px]"
            >
              {isThresholdLoading ? 'Updating...' : 'Update Threshold'}
            </button>
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
              disabled={isLoading}
              className="w-full py-3 bg-purple-900 hover:bg-purple-800 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/30 mt-[52px]"
            >
              {isGrantLoading ? 'Granting...' : 'Grant Creator Role'}
            </button>
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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-8 border border-zinc-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-900 p-3 rounded-lg">
            <Award className="text-white" size={24} />
          </div>
          <h2 className="text-3xl font-bold text-white">Become a Resolver</h2>
        </div>

        <div className="mb-6 p-5 bg-purple-950/30 rounded-lg border border-purple-900/30">
          <div className="flex items-start space-x-3">
            <Trophy className="text-purple-400 mt-0.5 flex-shrink-0" size={20} />
            <div className="text-sm text-purple-200">
              <p className="font-semibold mb-2">Resolver Role Benefits</p>
              <ul className="space-y-1 text-purple-300">
                <li>• Earn 13% of platform fees for verifying outcomes</li>
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
                <span className="text-white font-mono">100 APT</span>
              </div>
              <div className="flex justify-between">
                <span>Lock Period</span>
                <span className="text-white">30 days (renewable)</span>
              </div>
              <div className="flex justify-between">
                <span>Fee Share</span>
                <span className="text-emerald-400 font-semibold">13%</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleBecomeResolver}
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-purple-900 to-purple-800 hover:from-purple-800 hover:to-purple-700 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/30"
          >
            {isLoading ? 'Processing...' : 'Become Resolver'}
          </button>

          {result && (
            <div className="p-4 rounded-lg text-sm font-semibold text-center bg-emerald-950/50 text-emerald-400 border border-emerald-900/30">
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ResolverActionsTab = () => {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const [selectedPoolId, setSelectedPoolId] = useState('');
  const [winningOption, setWinningOption] = useState('');
  const [disputePoolId, setDisputePoolId] = useState('');
  const [resolvePoolId, setResolvePoolId] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<'propose' | 'dispute' | 'resolve'>('propose');

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
              disabled={isLoading}
              className="w-full py-4 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/30"
            >
              {isLoading ? 'Proposing...' : 'Propose Resolution'}
            </button>
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
              disabled={isLoading}
              className="w-full py-4 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-900/30"
            >
              {isLoading ? 'Disputing...' : 'Submit Dispute'}
            </button>
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
              disabled={isLoading}
              className="w-full py-4 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/30"
            >
              {isLoading ? 'Resolving...' : 'Resolve Pool'}
            </button>
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
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50"
          >
            {isLoading ? 'Creating Pool...' : 'Create Prediction Pool'}
          </button>

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
            <div className="flex gap-1">
              {['explore', 'admin', 'create event', 'become a resolver', 'resolver', 'leaderboard'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-semibold capitalize transition-all relative ${
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
          </>
        )}
      </main>
    </div>
  );
};

export default App;