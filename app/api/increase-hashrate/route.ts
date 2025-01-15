import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const telegramId = Number(body.telegramId) // Convert to number since Telegram IDs are numbers

        if (!telegramId || isNaN(telegramId)) {
            return NextResponse.json(
                { error: 'Invalid telegramId - must be a valid number' }, 
                { status: 400 }
            )
        }

        // First check if user exists
        const user = await prisma.user.findUnique({
            where: { telegramId }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' }, 
                { status: 404 }
            )
        }

        const updatedUser = await prisma.user.update({
            where: { telegramId },
            data: { hashrate: { increment: 1 } }
        })

        return NextResponse.json({
            success: true,
            hashrate: updatedUser.hashrate
        })
    } catch (error: Error | any) {
        console.error('Error increasing hashrate:', error)
        
        // Check if it's a Prisma error
        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'User not found' }, 
                { status: 404 }
            )
        }

        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 }
        )
    }
}