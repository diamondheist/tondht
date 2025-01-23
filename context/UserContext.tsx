import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
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

  interface UserContextType {
    userData: TelegramUser | null;
    isLoading: boolean;
  }
  const UserContext = createContext<UserContextType>({ userData: null, isLoading: true });
  
  export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<TelegramUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
     
    useEffect(() => {
        const fetchAndSaveUserData = async () => {
          try {
            if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
              const webAppData = window.Telegram.WebApp.initDataUnsafe;
              
              if (webAppData.user) {
                // Save user data to Firebase
                await saveUserData(webAppData.user);
                
                // Set user data in context
                setUserData(webAppData.user);
              }
            }
          } catch (error) {
            console.error('Error fetching or saving user data:', error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchAndSaveUserData();
      }, []);

      return (
        <UserContext.Provider value={{ userData, isLoading }}>
          {children}
        </UserContext.Provider>
      );
  }

  export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };