'use client';

import ProfileCard from '../components/ProfileCard';
import { useUser } from '@/context/UserContext';


const ProfilePage = () => {
  const { userData } = useUser()
  

  const dummyUserData = {
    id: 43743974754,
    first_name: 'Benjamin',
    last_name: 'David',
    username: 'JagabanThaprince',
    language_code: 'en',
    is_premium: false,
    photo_url: 'https://randomuser.me/api/portraits/men/3.jpg'
  };
  const displayData = userData || dummyUserData;
  if (!displayData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return ( 

      <ProfileCard userData={displayData} />
   )
};

export default ProfilePage;