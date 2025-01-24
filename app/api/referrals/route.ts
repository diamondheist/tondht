import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const { userId, referrerId } = await req.json();
    
    if (userId === referrerId) {
      return NextResponse.json({ error: 'Cannot refer yourself' }, { status: 400 });
    }

    // Check if referral already exists
    const referralQuery = query(
      collection(db, 'referrals'),
      where('userId', '==', userId),
      where('referrerId', '==', referrerId)
    );
    const existingReferralSnapshot = await getDocs(referralQuery);

    if (!existingReferralSnapshot.empty) {
      return NextResponse.json({ message: 'Referral already exists' }, { status: 200 });
    }

    // Create new referral
    await addDoc(collection(db, 'referrals'), {
      userId,
      referrerId,
      timestamp: serverTimestamp(),
      bonusEarned: false
    });

    return NextResponse.json({ message: 'Referral created successfully' }, { status: 201 });
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