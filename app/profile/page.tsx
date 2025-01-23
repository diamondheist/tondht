'use client';
import { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { saveUserData } from '@/lib/users';
import { TelegramUser } from '@/types/telegram';

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

const ProfilePage = () => {
  const [userData, setUserData] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const fetchAndSaveUserData = async () => {
      try {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
          const webAppData = window.Telegram.WebApp.initDataUnsafe;
          
          if (webAppData.user) {
            setUserData(webAppData.user);
            await saveUserData(webAppData.user);
          }
        }
      } catch (error) {
        console.error('Error fetching or saving user data:', error);
      }
    };

    fetchAndSaveUserData();
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return <ProfileCard userData={userData} />;
};

export default ProfilePage;