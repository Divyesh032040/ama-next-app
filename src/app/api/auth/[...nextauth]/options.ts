    /* eslint-disable @typescript-eslint/no-explicit-any */
    import NextAuth from "next-auth";
    import Credentials from "next-auth/providers/credentials";
    import bcrypt from "bcryptjs";
    import dbConnect from "@/lib/dbConnect";
    import UserModel from "@/modal/User";

    export const authOptions = {
    providers: [

        Credentials({

        credentials: {
            identifier: { label: "Email or Username", type: "text" },
            password: { label: "Password", type: "password" },
        },

        async authorize(credentials): Promise<any> {
          
            await dbConnect();

            try {
            const user = await UserModel.findOne({
                $or: [
                { email: credentials.identifier },
                { username: credentials.identifier },
                ],
            });

            if (!user) {
                throw new Error("No user found with this Email or Username");
            }

            if (!user.isVerified) {
                throw new Error("Please verify your email before logging in");
            }

            const isPasswordCorrect = await bcrypt.compare(
                String(credentials.password),
                String(user.password)
            );

            if (!isPasswordCorrect) {
                throw new Error("Incorrect password");
            }

            return user;
            } catch (err) {
            console.error("Authorize Error:", err);
            throw new Error("Authentication failed");
            }
        },
        }),
    ],

    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
        if (user) {
            token._id = user._id?.toString();
            token.isVerified = user.isVerified;
            token.username = user.username;
        }
        return token;
        },
        async session({ session, token }: { session: any; token: any }) {
        if (token) {
            session.user = {
            _id: token._id,
            isVerified: token.isVerified,
            username: token.username,
            };
        }
        return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/sign-in",
    },
    } satisfies Parameters<typeof NextAuth>[0]; 





