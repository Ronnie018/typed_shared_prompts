import NextAuth from 'next-auth';
import { Session } from 'next-auth';
import User from '@models/user';
import { SignInProps, SessionProps } from '@types/app/api/auth';

import { connectToDB } from '@utils/database';

import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  async session({ session }: SessionProps) {},
  async signIn({ profile }: SignInProps) {
    try {
      await connectToDB();


      const userExists = await User.findOne({
        email: profile.email,
      });

      if (!userExists) {
        User.create({
          username: profile.name.replace(' ', '').toLowerCase,
        });
      }
      // create new user

      // if not create a new one

      return true;
    } catch (error) {
      console.error('error while signing in\n ', error);
    }
  },
});

export { handler as GET, handler as POST };
