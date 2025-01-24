import React, { useState, useEffect } from 'react';

interface ReferralSystemProps {
  userId: string;
  startParam: string;
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
        setReferrals(data.referrals || []);
        setReferrer(data.referrer || null);
      }
    };

    checkReferral();
    fetchReferrals();
  }, [userId, startParam]);

  const handleInviteFriend = () => {
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
          className="bg-indigo-700 hover:bg-indigo-900 text-white font-semibold py-3 px-6 rounded-full border-t transition-colors duration-200"
        >
          Invite Friend
        </button>
      
        <button
          onClick={handleCopyLink}
          className="backdrop-blur-lg bg-white/5 hover:bg-indigo-400 text-indigo font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
        >
          {showCopied ? 'Link Copied!' : 'Copy invite Link'}
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
                className="bg-gray-50 hover:bg-gray-100 px-6 py-3 rounded-lg transition-colors duration-200"
              >
                User {referral}
              </div>
            ))}
          </div>
        </div>
      )}

      {showCopied && (
        <div className="flex justify-center mt-4 backdrop-blur-lg bg-white/5 bg-opacity-75 text-white px-4 py-2 rounded-full">
          Invite link copied!
        </div>
      )}
    </div>
  );
};

export default ReferralSystem;