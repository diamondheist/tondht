import { saveReferral, getReferrals, getReferrer } from '@/lib/referralService';
import { NextRequest,NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId, referrerId } = await req.json();
    
    if (!userId || !referrerId || userId === referrerId) {
      return NextResponse.json({ error: 'Invalid referral parameters' }, { status: 400 });
    }
    
    await saveReferral(userId, referrerId);
    
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
    
    const referrals = await getReferrals(userId);
    const referrer = await getReferrer(userId);
    
    return NextResponse.json({ referrals, referrer });
  } catch (error) {
    console.error('Referral fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch referrals' }, { status: 500 });
  }
}