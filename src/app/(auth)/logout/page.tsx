'use client';

import useSignOut from "@/modules/auth/use-sign-out";
import Spinner from "@/ui/spinner";
import { useEffect } from "react";

export default function HomePage() {
  const signOut = useSignOut();
  useEffect(() => {
    signOut();
  }, []);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
}
