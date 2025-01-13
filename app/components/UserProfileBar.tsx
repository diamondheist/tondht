'use client'

import { useRouter } from 'next/navigation';
import { UserIcon } from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

export default function UserProfileBar() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center p-4 border-gray-700 rounded-full">
      {/* UserProfile Icon */}
      <div 
        className="border border-gray-400 rounded-full p-1 flex items-center justify-center cursor-pointer" 
        onClick={() => router.push('/profile')}
      >
        <UserIcon className="w-5 h-5 text-white" />
      </div>
      {/* Help Icon */}
      <div 
        className="border border-gray-400 rounded-full p-1 flex items-center justify-center cursor-pointer" 
        onClick={() => router.push('/about')}
      >
        <QuestionMarkCircleIcon className="w-5 h-5 text-white" />
      </div>
    </div>
  );
}
