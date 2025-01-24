export interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
  }
  
  export interface UserData {
    telegramId: number;
    username: string;
    firstName: string;
    lastName: string;
    isPremium: boolean;
    hashrate: number;
    balance: number;
    createdAt: string;
  }