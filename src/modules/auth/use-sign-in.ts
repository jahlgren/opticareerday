import { signIn as nextSignIn } from 'next-auth/react';
import SignInSchema from './sign-in-schema';
import useSWRMutation from 'swr/mutation';

async function signIn(url: string, {arg}: {arg: SignInSchema}) {
  try {
    return await nextSignIn('credentials', { ...arg, redirect: false });
  }
  catch(error) {
    throw error;
  }
}

export default function useSignIn() {
  return useSWRMutation('/api/auth', signIn);
}
