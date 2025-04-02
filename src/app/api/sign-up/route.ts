/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextResponse , NextRequest} from "next/server"
import {sendVerificationEmail} from "@/helpers/sendVerificationEmail";
import bcryptjs from "bcryptjs";
import UserModel from "@/modal/User"
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose"



export async function POST( request: Request){

    try {
        
        await dbConnect();

        const {email , username , password} = await request.json();
    
        //verify username is available or not
        const existingVerifiedUserByUsername = await UserModel.findOne({
            username,
            isVerified:true
        })
    
        if(existingVerifiedUserByUsername){
            return NextResponse.json({
                success:false,
                message:"Username already exists",
            },{status:400})
        }
        
        const existingUserByEmail = await UserModel.findOne({email});
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return NextResponse.json({
                    success:false,
                    message:"Email already Exist"
                },{status:400})
            }else{
                const hashedPassword = await bcryptjs.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        }else{
            const hashedPassword = await bcryptjs.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            // const newUser = new UserModel({
            //     username,
            //     email,
            //     password: hashedPassword,
            //     verifyCode,
            //     verifyCodeExpiry: expiryDate,
            //     isVerified: false,
            //     isAcceptingMessages: true,
            //     messages: [],
            // });

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: [
                  { _id: new mongoose.Types.ObjectId(), content: "What's your favorite movie?", createdAt: new Date() },
                  { _id: new mongoose.Types.ObjectId(), content: "Do you have any pets?", createdAt: new Date() },
                  { _id: new mongoose.Types.ObjectId(), content: "What's your dream job?", createdAt: new Date() }
                ],
              });
            await newUser.save();
        }
    
        //send a verification email
    
        const emailResponse = await sendVerificationEmail(email , username , verifyCode); 
    
        if (!emailResponse.success) {
            return Response.json(
              {
                success: false,
                message: emailResponse.message,
              },
              { status: 500 }
            );
          }
    
        return NextResponse.json({
            success:true,
            message: 'User registered successfully. Please verify your account.',
        },{status:201})
        
    } catch (error) {
        console.error("error while register user" , error);
        return NextResponse.json({
            success:false,
            message:"Error while registering user"
        },{status:500})
    }
}


