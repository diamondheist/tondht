import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function saveReferral(userId: string, referrerId: string) {
  try {
    // Create a unique referral document
    const referralRef = doc(db, 'referrals', `${userId}_${referrerId}`);
    const referralDoc = await getDoc(referralRef);

    if (!referralDoc.exists()) {
      const referralData = {
        userId,
        referrerId,
        timestamp: new Date().toISOString(),
        bonusEarned: false
      };

      await setDoc(referralRef, referralData);
    }
  } catch (error) {
    console.error('Error saving referral:', error);
  }
}

export async function getReferrals(userId: string): Promise<string[]> {
  try {
    // Get referrals made by this user
    const referralsQuery = query(
      collection(db, 'referrals'),
      where('referrerId', '==', userId)
    );
    const referralsSnapshot = await getDocs(referralsQuery);

    return referralsSnapshot.docs.map(doc => doc.data().userId);
  } catch (error) {
    console.error('Error getting referrals:', error);
    return [];
  }
}

export async function getReferrer(userId: string): Promise<string | null> {
  try {
    // Get referrer (if exists)
    const referrerQuery = query(
      collection(db, 'referrals'),
      where('userId', '==', userId)
    );
    const referrerSnapshot = await getDocs(referrerQuery);

    return referrerSnapshot.empty 
      ? null 
      : referrerSnapshot.docs[0].data().referrerId;
  } catch (error) {
    console.error('Error getting referrer:', error);
    return null;
  }
}