/* eslint-disable @typescript-eslint/no-unused-vars */

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/modal/User";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import getServerSession from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Session } from "next-auth";

export async function POST(request: NextRequest) {
  
  await dbConnect();

  
  const session = (await getServerSession(authOptions)) as unknown as Session | null;

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

 
  const userId = session.user._id ?? "No ID found";

  
  const { acceptMessages } = await request.json();

  try {
    
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to find user to update message acceptance status",
        },
        { status: 404 }
      );
    }

    
    return NextResponse.json(
      {
        success: true,
        message: "Message acceptance status updated successfully",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating message acceptance status:", error);
    return NextResponse.json(
      { success: false, message: "Error updating message acceptance status" },
      { status: 500 }
    );
  }
}



export async function GET(request: NextRequest) {
  // Connect to the database
  await dbConnect();

  // Get the user session
  const session = (await getServerSession(authOptions) as unknown as Session | null);
  const user = session?.user;

  // Check if the user is authenticated
  if (!session || !user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    // Retrieve the user from the database using the ID
    const foundUser = await UserModel.findById(user._id);

    if (!foundUser) {
      // User not found
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Return the user's message acceptance status
    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving message acceptance status:', error);
    return Response.json(
      { success: false, message: 'Error retrieving message acceptance status' },
      { status: 500 }
    );
  }
}
