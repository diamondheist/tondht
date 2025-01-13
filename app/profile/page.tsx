'use client';
import { useEffect, useState } from 'react';

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  bio?: string;
  language_code: string;
  is_premium?: boolean;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const webAppData = window.Telegram.WebApp.initDataUnsafe;
      if (webAppData.user) {
        setUserData(webAppData.user as UserData);
      }
    }
  }, []);

  return (
    <>
      {!userData ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto p-4">
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl overflow-hidden shadow-2xl transform transition-all hover:scale-[1.01]">
            {/* Enhanced Profile Header */}
            <div className="relative h-56 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)] opacity-50"></div>
              </div>

              {/* Premium Badge - Moved to top right of header */}
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

              {/* Bio Section with new styling */}
              {userData.bio && (
                <div className="mt-8">
                  <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center mb-3">
                      <svg className="w-5 h-5 text-blue-200 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <h3 className="text-blue-200 font-medium">Bio</h3>
                    </div>
                    <p className="text-blue-100 leading-relaxed">{userData.bio}</p>
                  </div>
                </div>
              )}

              {/* Information Grid */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 transition-all hover:bg-white/10">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-blue-200 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    <h3 className="text-blue-200 font-medium">Telegram ID</h3>
                  </div>
                  <p className="text-white text-lg font-semibold">{userData.id}</p>
                </div>

                <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 transition-all hover:bg-white/10">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-blue-200 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <h3 className="text-blue-200 font-medium">Language</h3>
                  </div>
                  <p className="text-white text-lg font-semibold uppercase">{userData.language_code}</p>
                </div>

                <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 transition-all hover:bg-white/10">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-blue-200 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-blue-200 font-medium">Account Status</h3>
                  </div>
                  <p className="text-white text-lg font-semibold">
                    {userData.is_premium ? 'Premium Member' : 'Standard Member'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;