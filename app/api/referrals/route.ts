import { NextRequest, NextResponse } from 'next/server';
import { saveReferral, getReferrals, getReferrer } from '@/lib/referralService';

export async function POST(req: NextRequest) {
  try {
    const { userId, referrerId } = await req.json();
    
    if (!userId || !referrerId || userId === referrerId) {
      return NextResponse.json({ error: 'Missing UserId or ReferrerId' }, { status: 400 });
    }
    
    await saveReferral(userId, referrerId);
    
    return NextResponse.json({ message: 'Referral processed' }, { status: 200 });
  } catch (error) {
    console.error('Referral creation error:', error);
    return NextResponse.json({ error: 'Failed to process referral' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'Missing UserId' }, { status: 400 });
    }
    
    console.log('Fetching referrals for userId:', userId);
    
    const referrals = await getReferrals(userId);
    const referrer = await getReferrer(userId);
    
    console.log('Referrals:', referrals);
    console.log('Referrer:', referrer);
    
    return NextResponse.json({ referrals, referrer });
  } catch (error) {
    console.error('Full referral fetch error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch referrals', 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
