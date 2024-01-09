import { signOut } from 'next-auth/react';

export default function useSignOut() {
  return () => signOut({callbackUrl: '/login'});
}
