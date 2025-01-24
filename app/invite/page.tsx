'use client'

import ReferralSystem from '../components/ReferralSystem'
import { useEffect, useState } from 'react'
import { TelegramUser } from '@/types/telegram'

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        initData: string;
        initDataUnsafe: {
          user?: TelegramUser;
          start_param?: string;
        };
      };
    };
  }
}

export default function Home() {
  const [userId, setUserId] = useState('')
  const [startParam, setStartParam] = useState('')

  useEffect(() => {
    const initWebApp = () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const WebApp = window.Telegram.WebApp;
        WebApp.ready();
        setUserId(WebApp.initDataUnsafe.user?.id.toString() || '');
        setStartParam(WebApp.initDataUnsafe.start_param || '');
      }
    };

    initWebApp();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center mt-16">
      <h1 className="text-4xl font-bold mb-8">Refer A Friend</h1>
      <ReferralSystem userId={userId} startParam={startParam} />
    </main>
  )
}