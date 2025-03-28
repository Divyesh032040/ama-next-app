/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest , NextResponse} from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/modal/User';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import getServerSession from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import {Session} from "next-auth"

    export async function GET(request: NextRequest) {
    await dbConnect();
    const session = (await getServerSession(authOptions)) as unknown as Session | null ;
    const _user: User = session?.user;

    if (!session || !_user) {
        return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
        );
    }
    const userId = new mongoose.Types.ObjectId(_user._id);
    try {
        const user = await UserModel.aggregate([
        { $match: { _id: userId } },
        { $unwind: '$messages' },
        { $sort: { 'messages.createdAt': -1 } },
        { $group: { _id: '$_id', messages: { $push: '$messages' } } },
        ]).exec();

        if (!user || user.length === 0) {
        return NextResponse.json(
            { message: 'User not found', success: false },
            { status: 404 }
        );
        }

        return NextResponse.json(
        { messages: user[0].messages },
        {
            status: 200,
        }
        );
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return NextResponse.json(
        { message: 'Internal server error', success: false },
        { status: 500 }
        );
    }
    }