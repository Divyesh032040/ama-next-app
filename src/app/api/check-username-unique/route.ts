/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/modal/User"
import {NextRequest , NextResponse} from "next/server"
import {z} from "zod"
import {usernameValidation} from "@/schemas/signUpSchema"


const usernameQuerySchema = z.object({
    username:usernameValidation
})

export async function GET(request: NextRequest){
    await dbConnect();



}


