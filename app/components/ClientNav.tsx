'use client'; // Mark this as a client-side component

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HomeIcon, UserGroupIcon, BriefcaseIcon, WalletIcon } from '@heroicons/react/24/solid';

export default function ClientNav() {
   // Get the current pathname
  const pathname = usePathname(); 

  return (
    <nav className="fixed bottom-0 w-full rounded-lg bg-white shadow-lg border-t border-gray-100 z-10">
      <div className="max-w-lg mx-auto flex justify-around text-gray-600 items-center h-16">
        <Link
          href="/"
          className={`flex-1 flex flex-col justify-center items-center h-full transition-colors ${
            pathname === '/' ? 'text-blue-700' : 'hover:text-blue-700'
          }`}
        >
          <HomeIcon className="w-5 h-5 mb-1" />
          <span className="text-xs">Home</span>
        </Link>
   
        <Link
          href="/invite"
          className={`flex-1 flex flex-col justify-center items-center h-full transition-colors ${
            pathname === '/invite' ? 'text-blue-700' : 'hover:text-blue-700'
          }`}
        >
          <UserGroupIcon className="w-5 h-5 mb-1" />
          <span className="text-xs">Invite</span>
        </Link>

        <Link
          href="/mission"
          className={`flex-1 flex flex-col justify-center items-center h-full transition-colors ${
            pathname === '/mission' ? 'text-blue-700' : 'hover:text-blue-700'
          }`}
        >
          <BriefcaseIcon className="w-5 h-5 mb-1" />
          <span className="text-xs">Mission</span>
        </Link>

        <Link
          href="/wallet"
          className={`flex-1 flex flex-col justify-center items-center h-full transition-colors ${
            pathname === '/wallet' ? 'text-blue-700' : 'hover:text-blue-700'
          }`}
        >
          <WalletIcon className="w-5 h-5 mb-1" />
          <span className="text-xs">Wallet</span>
        </Link>
      </div>
    </nav>
  );
}
