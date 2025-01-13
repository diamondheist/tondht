'use client'

import DHTBalanceCard from '../components/DHTBalanceCard';
import TONBalanceCard from '../components/TONBalanceCard';
import { useState, useEffect, useCallback } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Address } from "@ton/core";
import { WalletIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const balance = 100

  const handleWalletConnection = useCallback((address: string) => {
    setTonWalletAddress(address);
    console.log("Wallet connected successfully!");
    setIsLoading(false);
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    console.log("Wallet disconnected successfully!");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account?.address);
      } else {
        handleWalletDisconnection();
      }
    };

    checkWalletConnection();

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      setIsLoading(true);
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };

  const formatAddress = (address: string) => {
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center p-2 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-400 mb-6">Wallet</h1>
      {/* Pass the balance to DHTBalanceCard */}
      <DHTBalanceCard balance={balance} imageSrc="/coin.png" />
      
      {/* You can implement the TONBalanceCard similarly as needed */}
      <TONBalanceCard balance={balance} imageSrc="/ton-coin.png" />
      
      <div className='text-center'>
        {tonWalletAddress ? (
            <div className="flex flex-col items-center">
            <p className="mb-4">Wallet Address : {formatAddress(tonWalletAddress)}</p>
            <button 
            onClick={handleWalletAction} 
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"><WalletIcon className="h-5 w-5" /> Disconnect Wallet</button>
            </div>
        ) : (
            <button 
            onClick={handleWalletAction}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"><WalletIcon className="h-5 w-5" /> Connect TON Wallet</button>
        )

        }
      </div>

      <h1 className="text-3xl font-semibold text-gray-200 mt-6 mb-6">Transaction History</h1>
     
    </div>
  );
}