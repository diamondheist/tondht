// src/components/ProfileCard.tsx
import React from 'react';
import { TelegramUser } from '@/types/telegram';

interface ProfileCardProps {
  userData: TelegramUser;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userData }) => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="backdrop-blur-lg bg-white/10 rounded-2xl overflow-hidden shadow-2xl transform transition-all hover:scale-[1.01]">
        {/* Profile Header */}
        <div className="relative h-56 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)] opacity-50"></div>
          </div>

          {/* Premium Badge */}
          {userData.is_premium && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 rounded-full shadow-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white font-semibold">Premium</span>
              </div>
            </div>
          )}

          {/* Profile Image */}
          <div className="absolute -bottom-16 w-full flex justify-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-white/30 backdrop-blur-xl bg-white/10 overflow-hidden shadow-xl transition-transform group-hover:scale-105">
                {userData.photo_url ? (
                  <img
                    src={userData.photo_url}
                    alt={`${userData.first_name}'s profile`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-white text-xl font-semibold">
                    {userData.first_name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 pb-8 px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">
              {userData.first_name} {userData.last_name}
            </h1>
            {userData.username && (
              <p className="text-blue-200 mt-2 text-lg">@{userData.username}</p>
            )}
          </div>

          {userData.bio && (
            <div className="mt-8">
              <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-blue-200 font-medium">Bio</h3>
                <p className="text-blue-100 leading-relaxed">{userData.bio}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;