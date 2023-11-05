import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bycrypt from 'bcrypt';
import { AuthOptions } from 'next-auth';

import prisma from '@/prisma/client';

import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      authorize: async (credentials, req) => {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null;

        const passMatch: boolean = await bycrypt.compare(credentials.password, user.password!);

        return passMatch ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};

export default authOptions;
