import SignInView from "@/modules/auth/sign-in-view";
import {redirect} from 'next/navigation';
import getServerSession from "@/modules/auth/api/get-server-session";

export default async function LoginPage() {
  const session = await getServerSession();

  if(session?.user) {
    return redirect('/');
  }

  return (
    <SignInView />
  );
}
