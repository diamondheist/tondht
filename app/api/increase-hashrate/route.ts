import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const { telegramId } = await req.json()

        if (!telegramId) {
            return NextResponse.json({ error: 'Invalid telegramId' }, { status: 400 })
        }

        const updatedUser = await prisma.user.update({
            where: { telegramId },
            data: { hashrate: { increment: 1 } }
        })

        return NextResponse.json({ success: true, hashrate: updatedUser.hashrate })
    } catch (error) {
        console.error('Error increasing hashrate:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}