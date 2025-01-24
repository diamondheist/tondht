import { NextRequest, NextResponse } from 'next/server';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(req: NextRequest) {
  try {
    const { userId, referrerId } = await req.json();

    if (!userId || !referrerId || userId === referrerId) {
      return NextResponse.json({ error: 'Invalid referral parameters' }, { status: 400 });
    }

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

    return NextResponse.json({ message: 'Referral processed' }, { status: 200 });
  } catch (error) {
    console.error('Referral creation error:', error);
    return NextResponse.json({ error: 'Failed to process referral' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Get referrals made by this user
    const referralsQuery = query(
      collection(db, 'referrals'),
      where('referrerId', '==', userId)
    );
    const referralsSnapshot = await getDocs(referralsQuery);

    // Get referrer (if exists)
    const referrerQuery = query(
      collection(db, 'referrals'),
      where('userId', '==', userId)
    );
    const referrerSnapshot = await getDocs(referrerQuery);

    const referrals = referralsSnapshot.docs.map(doc => doc.data().userId);
    const referrer = referrerSnapshot.empty 
      ? null 
      : referrerSnapshot.docs[0].data().referrerId;

    return NextResponse.json({ referrals, referrer });
  } catch (error) {
    console.error('Referral fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch referrals' }, { status: 500 });
  }
}