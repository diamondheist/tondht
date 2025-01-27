import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Save a referral, updating a single document per user
export async function saveReferral(userId: string, referrerId: string) {
  try {
    const referralRef = doc(db, 'referrals', userId); // Use userId as document ID
    const referralDoc = await getDoc(referralRef);

    if (referralDoc.exists()) {
      // Update the existing document
      const existingData = referralDoc.data();
      const referrals = existingData.referrals || []; // Default to empty array if missing

      // Avoid adding duplicate referrerId
      if (!referrals.includes(referrerId)) {
        referrals.push(referrerId);
        await setDoc(referralRef, { ...existingData, referrals }, { merge: true });
      }
    } else {
      // Create a new document for this userId
      const newReferral = {
        userId,
        referrals: [referrerId], // Start with one referrer
        createdAt: new Date().toISOString(),
      };

      await setDoc(referralRef, newReferral);
    }
  } catch (error) {
    console.error('Error saving referral:', error);
  }
}

// Get the list of users referred by the given userId
export async function getReferrals(userId: string): Promise<string[]> {
  try {
    const referralRef = doc(db, 'referrals', userId);
    const referralDoc = await getDoc(referralRef);

    if (!referralDoc.exists()) {
      return [];
    }

    const data = referralDoc.data();
    return data.referrals || []; // Return referrals array or empty array
  } catch (error) {
    console.error('Error getting referrals:', error);
    return [];
  }
}

// Get the referrer for a specific userId
export async function getReferrer(userId: string): Promise<string | null> {
  try {
    const referralsQuery = query(
      collection(db, 'referrals'),
      where('referrals', 'array-contains', userId)
    );
    const referrerSnapshot = await getDocs(referralsQuery);

    return referrerSnapshot.empty
      ? null
      : referrerSnapshot.docs[0].id; // Document ID will be the referrerId
  } catch (error) {
    console.error('Error getting referrer:', error);
    return null;
  }
}
