


/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/modal/User';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { Session } from 'next-auth';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const session = (await getServerSession(authOptions)) as Session | null;

        if (!session || !session.user || !session.user._id) {
            return NextResponse.json(
                { success: false, message: 'Not authenticated' },
                { status: 401 }
            );
        }

        const userId = new mongoose.Types.ObjectId(session.user._id);

        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: { path: '$messages', preserveNullAndEmptyArrays: true } }, // Preserve users without messages
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ]).exec();

        if (!user || user.length === 0) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        const userData = user[0];

        if (!userData.messages || userData.messages.length === 0) {
            return NextResponse.json(
                { success: true, message: 'User has no messages', messages: [] },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Messages retrieved successfully', messages: userData.messages },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
