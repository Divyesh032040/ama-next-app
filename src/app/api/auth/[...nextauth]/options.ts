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
              const dbUser = await UserModel.findOne({
                $or: [{ email: credentials.identifier }, { username: credentials.identifier }],
              });
          
              if (!dbUser) {
                throw new Error("No user found with this Email or Username");
              }
          
              if (!dbUser.isVerified) {
                throw new Error("Please verify your email before logging in");
              }
          
              const isPasswordCorrect = await bcrypt.compare(
                String(credentials.password),
                String(dbUser.password)
              );
          
              if (!isPasswordCorrect) {
                throw new Error("Incorrect password");
              }
          
              const user = {
                _id: dbUser._id?.toString(),
                username: dbUser.username,
                email: dbUser.email,
                isVerified: dbUser.isVerified,
              }
              return user// Return a plain object instead of Mongoose document
          
            } catch (err) {
              console.error("Authorize Error:", err);
              throw new Error("Authentication failed");
            }
          }
        }),
    ],

    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
        if (user) {
            token._id = user._id.toString();
            token.isVerified = user.isVerified;
            token.username = user.username;
        }
        return token;
        },
        async session({ session, token }: { session: any; token: any }) {
          if (token) {
            session.user._id = token._id;
            session.user.isVerified = token.isVerified;
            session.user.isAcceptingMessages = token.isAcceptingMessages;
            session.user.username = token.username;
          }
     
          return session;
        },
          
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/sign-up",
    },
    } satisfies Parameters<typeof NextAuth>[0]; 





