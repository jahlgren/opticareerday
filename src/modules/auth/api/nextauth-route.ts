import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import SignInSchema, { SignInSchemaValidator } from '../sign-in-schema';
import getConnection from '@/database/connection';
import UserModel from './user-model';
import type {TokenUser as AppUser} from './../types';
import userDbQuery from './user-db-query';
import { comparePasswordHash } from './password';
import toYearMonthDayHourMinuteSecond from '@/lib/date-utils';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        const {username, password} = credentials as SignInSchema;

        if(!SignInSchemaValidator.isValidSync({username, password}))
          return null;

        const connection = getConnection();
        let user: Partial<UserModel>|undefined;

        try {
          user = (
            await userDbQuery(connection)
            .select('id', 'name', 'username', 'password', 'role')
            .where({username})
            .limit(1).first()
          );
        }
        catch(error) { console.log(error); return null; }
        
        if(!user || await comparePasswordHash(password, user.password!) === false)
          return null;
        
        await userDbQuery(connection)
          .where({id: user.id})
          .update({lastSignedInAt: toYearMonthDayHourMinuteSecond(new Date())})

        return {
          id: user!.id!,
          username: user!.username!,
          name: user!.name!,
          role: user!.role!
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token}) {
      if(token && token.user) {
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user }) {
      if(user) {
        token.user = user as unknown as AppUser
      }
      return token;
    }
  },
  session: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: '/login',
    signOut: '/logout'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
