'use client'
import { useUser } from '@/context/UserContext' // adjust path as needed
import ReferralSystem from '../components/ReferralSystem'

export default function Home() {
  const { userData, isLoading } = useUser()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center mt-16">
      <h1 className="text-4xl font-bold mb-8">Refer A Friend</h1>
      <ReferralSystem 
        userId={userData?.id.toString() || ''} 
        startParam={typeof window !== 'undefined' && window.Telegram?.WebApp.initDataUnsafe.start_param || ''} 
      />
    </main>
  )
}