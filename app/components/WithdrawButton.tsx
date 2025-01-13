'use client'

import Link from 'next/link'; // Import Link from Next.js

export default function WithdrawButton() {
  return (
    <Link href="/wallet"> {/* Wrap the button with Link */}
      <button className="bg-indigo-600 text-white px-4 py-1.5 text-xs rounded-full shadow-md hover:bg-blue-800 transition duration-200 ease-in-out">
        Withdraw
      </button>
    </Link>
  );
}
