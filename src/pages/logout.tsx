import { signOut } from "next-auth/react";
import { useEffect } from "react";

const LogoutPage = () => {
  useEffect(() => {
    signOut({
      redirect: true,
      callbackUrl: '/login'
    });
  }, []);
  return <></>
}

export default LogoutPage;