"use client";

import React, { useState } from 'react';
import { Wallet, Coins, PieChart, ArrowLeftRight, Clock, DollarSign, HelpCircle } from 'lucide-react';

const AcalaPortfolioTracker = () => {
  const [address, setAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  
  const demoData = {
    totalValue: 1245.67,
    tokens: [
      { name: 'ACA', amount: 500, value: 400.00, apy: 12.5 },
      { name: 'aUSD', amount: 350, value: 350.00, apy: 5.2 },
      { name: 'LDOT', amount: 2.5, value: 375.67, apy: 8.7 },
      { name: 'DOT', amount: 10, value: 120.00, apy: 0 }
    ],
    positions: [
      { type: 'Liquidity', pair: 'ACA/aUSD', value: 200.00, apy: 14.2 },
      { type: 'Staking', asset: 'ACA', value: 150.00, apy: 12.5 },
      { type: 'Loan', collateral: 'DOT', borrowed: 'aUSD', value: 75.00, ratio: '150%' }
    ],
    transactions: [
      { type: 'Swap', from: 'DOT', to: 'ACA', amount: '5 DOT', value: '$60.00', time: '2 hours ago' },
      { type: 'Deposit', asset: 'aUSD', amount: '100 aUSD', value: '$100.00', time: '1 day ago' },
      { type: 'Borrow', asset: 'aUSD', amount: '75 aUSD', collateral: '5 DOT', time: '2 days ago' }
    ]
  };
  
  const connectWallet = () => {
    // In a real app, this would connect to Polkadot.js or similar
    setIsConnected(true);
  };
  
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };
  
  // Function to get color based on retention value
  const getColor = (value: number) => {
    // Scale from light blue to dark blue based on retention percentage
    const intensity = Math.floor((value / 100) * 255);
    return `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
  };
  
  // Speaker notes for presentation
  const speakerNotes: Record<string, string> = {
    welcome: "Welcome to the Acala Portfolio Tracker demo. This application showcases how we can build intuitive interfaces on top of Acala's DeFi ecosystem.",
    connect: "The first step for any DeFi application is wallet connection. Our app uses Polkadot.js to securely connect to the user's wallet without exposing private keys.",
    overview: "The Overview tab provides a comprehensive look at the user's portfolio. It shows the total value of all assets and positions, along with individual token balances and their respective APYs.",
    positions: "In the Positions tab, we display active DeFi positions like liquidity pools, staking, and loans. This helps users monitor their yield-generating activities and loan health.",
    history: "The History tab shows recent transactions, giving users a clear audit trail of their DeFi activities. This transparency is essential for users to track their decision-making.",
    architecture: "Behind the scenes, this app connects to the Acala blockchain using Polkadot.js API and Acala.js SDK. All data is fetched directly from the chain, ensuring accuracy and real-time updates."
  };
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800">Total Portfolio Value</h3>
              <p className="text-3xl font-bold text-blue-600">{formatCurrency(demoData.totalValue)}</p>
            </div>
            
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Token Balances</h3>
                <span className="text-sm text-gray-500">4 assets</span>
              </div>
              <div className="space-y-3">
                {demoData.tokens.map((token, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="font-medium text-blue-800">{token.name.substring(0, 1)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{token.name}</p>
                        <p className="text-sm text-gray-500">{token.amount} tokens</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(token.value)}</p>
                      {token.apy > 0 && <p className="text-sm text-green-600">{token.apy}% APY</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'positions':
        return (
          <div className="space-y-4">
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Active DeFi Positions</h3>
              {demoData.positions.map((position, index) => (
                <div key={index} className="border-b pb-3 mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">{position.type}</span>
                    <span className="font-medium">{formatCurrency(position.value)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">
                      {position.pair || position.asset || `${position.collateral} → ${position.borrowed}`}
                    </span>
                    <span className="text-sm text-green-600">
                      {position.apy ? `${position.apy}% APY` : `Health: ${position.ratio}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'transactions':
        return (
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {demoData.transactions.map((tx, index) => (
                <div key={index} className="flex items-start border-b pb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    {tx.type === 'Swap' ? <ArrowLeftRight size={18} /> : 
                     tx.type === 'Deposit' ? <Wallet size={18} /> : 
                     <DollarSign size={18} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">{tx.type}</p>
                      <p className="text-gray-600">{tx.time}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {tx.type === 'Swap' ? `${tx.from} → ${tx.to} (${tx.amount})` :
                       tx.type === 'Deposit' ? `${tx.amount}` :
                       `Borrowed ${tx.amount} with ${tx.collateral} collateral`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return <div>Select a tab to view details</div>;
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-gray-50 rounded-lg shadow overflow-hidden relative">
        <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Acala Portfolio Tracker</h2>
            <p className="text-sm opacity-90">Track your DeFi assets across the Acala Network</p>
          </div>
          <button 
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className="text-white hover:bg-blue-700 rounded-full p-1"
            title="Toggle Speaker Notes"
          >
            <HelpCircle size={24} />
          </button>
        </div>
      
      {!isConnected ? (
        <div className="p-6 flex flex-col items-center justify-center">
          <Wallet size={48} className="text-blue-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Connect your wallet</h3>
          <p className="text-gray-600 text-center mb-4">Connect your Polkadot wallet to view your Acala portfolio</p>
          
          {/* No local speaker notes needed since we have the fixed one now */}
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address (for demo)"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <button 
            onClick={connectWallet}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-white p-4 border-b">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Connected Wallet</p>
                <p className="font-mono text-sm">{address || '5FdeH...'}</p>
              </div>
              <button className="text-blue-600 text-sm">Disconnect</button>
            </div>
          </div>
          
          {/* Speaker Notes Panel - Fixed positioning to ensure visibility */}
          {showSpeakerNotes && (
            <div className="fixed top-4 right-4 bg-yellow-50 border border-yellow-300 p-4 rounded-md shadow-lg w-64 z-50">
              <h3 className="font-bold text-yellow-800 mb-2">Speaker Notes</h3>
              <p className="text-sm text-yellow-800 mb-2">
                {speakerNotes[activeTab as keyof typeof speakerNotes] || speakerNotes.welcome}
              </p>
              <p className="text-xs italic text-yellow-600 mt-2">Notes visible only during presentation. Toggle with ? icon.</p>
            </div>
          )}
          
          <div className="flex border-b">
            <button
              className={`flex-1 py-3 px-4 text-center ${activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center ${activeTab === 'positions' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('positions')}
            >
              Positions
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center ${activeTab === 'transactions' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('transactions')}
            >
              History
            </button>
          </div>
          
          <div className="p-4">
            {renderTabContent()}
          </div>
          
          {/* Removed bottom notes since we have the fixed one now */}
        </div>
      )}
      </div>
    </div>
  );
};

export default AcalaPortfolioTracker;