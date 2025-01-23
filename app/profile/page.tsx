'use client';

import ProfileCard from '../components/ProfileCard';
import { useUser } from '@/context/UserContext';


const ProfilePage = () => {
  const { userData } = useUser()

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