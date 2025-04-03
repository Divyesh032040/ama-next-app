        // import dbConnect from '@/lib/dbConnect';
        // import UserModel from '@/modal/User';
        // import {NextRequest , NextResponse} from "next/server";

        // export async function POST(request: NextRequest) {
        // // Connect to the database
        // await dbConnect();

        // try {
        //     const { username, code } = await request.json();
        //     const decodedUsername = decodeURIComponent(username);
        //     const user = await UserModel.findOne({ username: decodedUsername });

        //     if (!user) {
        //     return NextResponse.json(
        //         { success: false, message: 'User not found' },
        //         { status: 404 }
        //     );
        //     }

        //     // Check if the code is correct and not expired
        //     const isCodeValid = user.verifyCode === code;
        //     const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        //     if (isCodeValid && isCodeNotExpired) {
        //     // Update the user's verification status
        //     user.isVerified = true;
        //     await user.save();

        //     return NextResponse.json(
        //         { success: true, message: 'Account verified successfully' },
        //         { status: 200 }
        //     );
        //     } else if (!isCodeNotExpired) {
        //     // Code has expired
        //     return NextResponse.json(
        //         {
        //         success: false,
        //         message:
        //             'Verification code has expired. Please sign up again to get a new code.',
        //         },
        //         { status: 400 }
        //     );
        //     } else {
        //     // Code is incorrect
        //     return NextResponse.json(
        //         { success: false, message: 'Incorrect verification code' },
        //         { status: 400 }
        //     );
        //     }
        // } catch (error) {
        //     console.error('Error verifying user:', error);
        //     return NextResponse.json(
        //     { success: false, message: 'Error verifying user' },
        //     { status: 500 }
        //     );
        // }
        // }


    import dbConnect from '@/lib/dbConnect';
    import UserModel from '@/modal/User'; // Fixed typo
    import { NextRequest, NextResponse } from 'next/server';

    export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        let body;
        try {
        body = await request.json();
        } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Invalid JSON in request body' },
            { status: 400 }
        );
        }

        const { username, code } = body;
        const user = await UserModel.findOne({ username });

        if (!user) {
        return NextResponse.json(
            { success: false, message: 'User not found' },
            { status: 404 }
        );
        }

        // Ensure expiry is a valid date
        const expiryDate = user.verifyCodeExpiry ? new Date(user.verifyCodeExpiry) : null;
        const isCodeNotExpired = expiryDate && expiryDate > new Date();

        if (user.verifyCode === code && isCodeNotExpired) {
        user.isVerified = true;
        await user.save();

        return NextResponse.json(
            { success: true, message: 'Account verified successfully' },
            { status: 200 }
        );
        } else if (!isCodeNotExpired) {
        return NextResponse.json(
            { success: false, message: 'Verification code has expired. Please sign up again to get a new code.' },
            { status: 400 }
        );
        } else {
        return NextResponse.json(
            { success: false, message: 'Incorrect verification code' },
            { status: 400 }
        );
        }
    } catch (error) {
        console.error('Error verifying user:', error);
        return NextResponse.json(
        { success: false, message: 'Error verifying user' },
        { status: 500 }
        );
    }
    }
