import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
}

export async function POST(req: NextRequest) {
    try {
        const userData = await req.json() as TelegramUser

        // More detailed logging
        console.log('Received user data:', JSON.stringify(userData, null, 2))

        if (!userData || !userData.id || typeof userData.id !== 'number') {
            console.log('Invalid user data received:', userData)
            return NextResponse.json({ 
                error: 'Invalid user data - ID must be a number' 
            }, { status: 400 })
        }

        let user = await prisma.user.findUnique({
            where: { telegramId: userData.id }
        })

        console.log('Existing user:', user) // Log if user exists

        if (!user) {
            console.log('Creating new user with data:', userData)
            user = await prisma.user.create({
                data: {
                    telegramId: userData.id,
                    username: userData.username || '',
                    firstName: userData.first_name || '',
                    lastName: userData.last_name || '',
                    hashrate: 0 // Set initial hashrate
                }
            })
            console.log('New user created:', user)
        }

        return NextResponse.json({
            telegramId: user.telegramId,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            hashrate: user.hashrate
        })
    } catch (error: Error | any) {
        console.error('Error processing user data:', error)
        
        // Check for specific Prisma errors
        if (error.code === 'P2002') {
            return NextResponse.json({ 
                error: 'User already exists' 
            }, { status: 409 })
        }

        return NextResponse.json({ 
            error: 'Internal server error',
            details: error.message 
        }, { status: 500 })
    }
}
