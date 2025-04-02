
import UserModel from '@/modal/User';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { NextResponse  , NextRequest } from "next/server";


export async function DELETE(req: NextRequest,  context: { params: { messageid: string } }) {


        const params = await context.params;
        console.log("Params received:", params); 
        console.log("Params received:", params);

        const messageid = params.messageid; 

  if(!messageid){
    return NextResponse.json({
      status:false,
      message:"Message id not found"
    })
  }
  await dbConnect();

  if (!messageid) {
    return new Response(
      JSON.stringify({ success: false, message: 'Message ID is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response(
      JSON.stringify({ success: false, message: 'Not authenticated' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const userId = (session.user as { _id?: string; id?: string })._id || session.user.id;
    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, message: 'User ID is missing' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const updateResult = await UserModel.updateOne(
      { _id: userId },
      { $pull: { messages: { _id: messageid } } }
    );

    if (updateResult.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'Message not found or already deleted' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Message deleted' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(`❌ Error deleting message:`, error);

    return new Response(
      JSON.stringify({ success: false, message: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}


