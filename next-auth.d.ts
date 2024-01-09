import { Role, TokenUser as AppUser } from './src/modules/authentication/types';
import NextAuth from 'next-auth';

declare module "next-auth" {
  interface AdapterUser extends AppUser {}

  interface User extends AppUser {
    id: number
  }

  interface Session {
    user: AppUser
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: AppUser
  }
}
