import React, { useState, useEffect } from 'react';

interface ReferralSystemProps {
  initData: string;
  userId: string;
  startParam: string;
}

declare global {
  interface TelegramWebApp {
    openTelegramLink: (url: string) => void;
  }
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({ userId, startParam }) => {
  const [referrals, setReferrals] = useState<string[]>([]);
  const [referrer, setReferrer] = useState<string | null>(null);
  const [showCopied, setShowCopied] = useState(false);
  
  const INVITE_URL = "https://t.me/Diamondheistbot/DHT";

  useEffect(() => {
    const checkReferral = async () => {
      if (startParam && userId) {
        await fetch('/api/referrals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, referrerId: startParam }),
        });
      }
    };

    const fetchReferrals = async () => {
      if (userId) {
        const response = await fetch(`/api/referrals?userId=${userId}`);
        const data = await response.json();
        setReferrals(data.referrals);
        setReferrer(data.referrer);
      }
    };

    checkReferral();
    fetchReferrals();
  }, [userId, startParam]);

  const handleInviteFriend = () => {
    if (!window.Telegram?.WebApp) {
      console.warn('Telegram WebApp is not available');
      return;
    }

    const inviteLink = `${INVITE_URL}?startapp=${userId}`;
    const shareText = 'Join me on this awesome Telegram mini app! 🚀';
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`;
    window.open(fullUrl);
  };

  const handleCopyLink = () => {
    const inviteLink = `${INVITE_URL}?startapp=${userId}`;
    navigator.clipboard.writeText(inviteLink);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      {referrer && (
        <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg mb-6">
          You were referred by user {referrer}
        </div>
      )}

      <div className="flex flex-col space-y-4">
        <button
          onClick={handleInviteFriend}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Invite Friend
        </button>
        
        <button
          onClick={handleCopyLink}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {showCopied ? 'Link Copied!' : 'Copy Invite Link'}
        </button>
      </div>

      {referrals.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            Your Referrals ({referrals.length})
          </h2>
          <div className="space-y-2">
            {referrals.map((referral, index) => (
              <div
                key={index}
                className="bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-lg transition-colors duration-200"
              >
                User {referral}
              </div>
            ))}
          </div>
        </div>
      )}

      {showCopied && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg">
          Invite link copied!
        </div>
      )}
    </div>
  );
};

export default ReferralSystem;