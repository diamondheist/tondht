'use client';

import { useState } from 'react';
import UpgradeButton from './components/UpgradeButton';
import ClaimButton from './components/ClaimButton';
import DHTBalanceCard from './components/DHTBalanceCard';
import TONBalanceCard from './components/TONBalanceCard';
import Ticker from './components/Ticker';
import UserProfileBar from './components/UserProfileBar';

export default function HomePage() {
  const [balance, setBalance] = useState(100); // Initial balance
  const [isMining, setIsMining] = useState(false);
  const [minedAmount, setMinedAmount] = useState(0);

  const hashRate = 1

  const toggleMining = () => {
    if (isMining) {
      setIsMining(false);
      return;
    }

    setIsMining(true);
    const interval = setInterval(() => {
      setMinedAmount((prev) => {
        if (prev + 0.001 >= 1000) {
          clearInterval(interval);
          setIsMining(false);
          return 1000;
        }
        return prev + 0.001;
      });
    }, 1000);
  };

  const claimDHT = () => {
    if (minedAmount < 1000) {
      alert('Mining must be complete before claiming.');
      return;
    }

    // Hardcoded logic to add mined amount to balance
    const newBalance = balance + minedAmount;
    setBalance(newBalance);
    setMinedAmount(0);
    alert(`Claimed ${minedAmount} DHT! New Balance: ${newBalance}`);
  };

  const handleUpgrade = () => {
    alert('Upgrade Miner feature coming soon!');
  };


  return (
    <div className="min-h-screen p-2">
      <div className="max-w-l mx-auto">
        <Ticker />
        
        {/* Balance Cards */}
        <div className="mb-">
          <TONBalanceCard balance={balance} imageSrc="/ton-coin.png" />
          <DHTBalanceCard balance={balance} imageSrc="/coin.png" />
        </div>

        <UserProfileBar />

        {/* Mining Section */}
        <div className="mt-4 border-2 rounded-2xl p-6 shadow-xl">
          <div className="relative w-full aspect-square max-w-[600px] mx-auto mb-6 flex justify-center items-center">
            <img src="/coin.png" alt="DHT Token" className={`relative z-10 ${isMining ? 'animate-bounce' : 'animate-float'}`} sizes="400px" style={{objectFit: 'contain'}} width={600} height={600}/>
          </div>

          {/* Mining Stats */}
          <div className="text-center mb-6">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md">
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {minedAmount.toFixed(6)} $DHT
              </p>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${isMining ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <p className="text-sm text-gray-300">
                  Hashrate: <span className="font-mono">{hashRate} GH/s</span> ⚡️
                </p>
              </div>
            </div>
          </div>

          {/* Mining Controls */}
          <div className="space-y-4">
            <button
              onClick={toggleMining}
              className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all transform hover:scale-105 ${
                isMining 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 animate-pulse shadow-lg shadow-green-500/50' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {isMining ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Mining...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Start Mining</span>
                  </>
                )}
              </div>
            </button>

            <div className="grid grid-cols-2 gap-4">
              <ClaimButton 
                onClick={claimDHT} 
                text="Claim DHT"
                disabled={minedAmount < 1000}
              />
              <UpgradeButton 
                onClick={handleUpgrade} 
                text="Upgrade Miner" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}