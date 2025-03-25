import VerificationEmail from "../../emails/VerificationEmail";
import { resend } from "../lib/resend";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    if (!email || !username || !verifyCode) {
      return {
        success: false,
        message: "Invalid input: email, username, and verifyCode are required",
      };
    }

    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error: unknown) {
    console.error("Error sending verification email:", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Error sending verification email",
    };
  }
}
