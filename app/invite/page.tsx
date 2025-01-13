'use client'

import ReferralSystem from '../components/ReferralSystem'
import { useEffect, useState } from 'react'

declare global {
    interface WebApp {
        ready: () => void;
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
          };
          start_param?: string;
        };
      }
  }


export default function Home() {
  const [initData, setInitData] = useState('')
  const [userId, setUserId] = useState('')
  const [startParam, setStartParam] = useState('')

  useEffect(() => {
    const initWebApp = () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const WebApp = window.Telegram.WebApp;
        WebApp.ready();
        setInitData(WebApp.initData);
        setUserId(WebApp.initDataUnsafe.user?.id.toString() || '');
        setStartParam(WebApp.initDataUnsafe.start_param || '');
      }
    };

    initWebApp();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Telegram Referral Demo</h1>
      <ReferralSystem initData={initData} userId={userId} startParam={startParam} />
    </main>
  )
}