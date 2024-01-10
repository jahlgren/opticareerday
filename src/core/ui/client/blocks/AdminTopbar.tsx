import { useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "../components/Logo";
import UserIcon from "../components/icons/UserIcon";

const AdminTopbar = () => {
  
  const { data: session } = useSession();

  return (
    <div className="w-full h-20 px-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mx-auto w-full max-w-5xl h-full">

        <div className="hidden sm:block"><Logo title="admin" /></div>
        <div className="sm:hidden"></div>

        <div className="flex items-center">
          <div className="flex flex-col items-end">
            <span className="leading-none">{ session?.user?.name }</span>
            <Link href="/logout" className="text-primary-dark font-medium text-base">Logga ut</Link>
          </div>
          <div className="flex justify-center items-center ml-4 w-12 h-12 rounded-full bg-gray-200 border border-gray-300 fill-gray-900">
            <UserIcon size={32} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminTopbar;
