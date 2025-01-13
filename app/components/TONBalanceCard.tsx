'use client'

import WithdrawButton from '../components/WithdrawButton';

interface BalanceCardProps {
  balance: number;
  imageSrc: string;
}

export default function TONBalanceCard({ balance, imageSrc }: BalanceCardProps) {
  return (
    <div className="w-full flex items-center justify-between rounded-xl backdrop-blur-lg bg-white/20 shadow-md py-2 px-2 mb-1">
    {/* Center: TON Balance */}
    <div className="flex flex-row">
    <img src={imageSrc} alt="TON Icon" className="w-10 h-10" />
     <div className="flex flex-col justify-start px-2">
        {/* Left: Image */}
       <span className="text-xs font-semibold text-gray-400">TON Balance</span>
       <span className="text-l font-semibold text-white">{Math.floor(balance)} TON</span>
     </div>
    </div>
     {/* Right: Withdraw Button */}
     <WithdrawButton />
   </div>
  );
}
