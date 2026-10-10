"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { IoMdArrowDropdown } from "react-icons/io";
import toast from "react-hot-toast";

const Sesstion = () => {
  const [showprofile, setshowprofile] = useState(false);

  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const handleprofile = () => {
    setshowprofile((prev) => !prev);
  };

  const handlesignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        return;
      }
      toast.success("Sign Out Successfull !");
      setshowprofile(false);
    } catch (error) {
      toast.error("Unexpected sign out error:");
    }
  };

  return (
    <div className="relative">
      {user ? (
        <div className="flex items-center gap-3">
          
          <div className="avatar">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={
                  user.image ||
                  "https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                }
                alt="User Avatar"
                height={48}
                width={48}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

         
          <h2 className="text-lg font-semibold">{user.name}</h2>

         
          {pathname !== "/profile" && (
            <button
              type="button"
              onClick={handleprofile}
              aria-label="Toggle profile menu"
              aria-expanded={showprofile}
              className="text-[24px] cursor-pointer"
            >
              <IoMdArrowDropdown />
            </button>
          )}
        </div>
      ) : (
        
        <div className="flex gap-2">
          <Link href="/sign-in">
            <button className="h-8 w-20 sm:h-10 sm:w-30 text-black">
              সাইন ইন
            </button>
          </Link>

          <Link href="/sign-up">
            <button className="bg-[#1A9951] h-8 w-20 sm:h-10 sm:w-30 text-white">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}

      
      {user && showprofile && pathname !== "/profile" && (
        <div className="bg-white p-4 flex flex-col rounded-xl shadow-lg absolute top-12 right-0 z-50 min-w-56">
          <h2 className="text-xl font-bold">{user.name}</h2>

          <h3 className="text-sm font-medium text-gray-600 break-all mt-1">
            {user.email}
          </h3>

          <Link href="/profile" onClick={() => setshowprofile(false)}>
            <button
              type="button"
              className="w-full text-left box-border bg-gray-100 hover:bg-gray-200 px-4 py-2 my-2 rounded"
            >
              👤 আমার প্রোফাইল
            </button>
          </Link>

          <button
            type="button"
            className="w-full text-left box-border bg-gray-100 hover:bg-gray-200 px-4 py-2 text-red-500 rounded"
            onClick={handlesignOut}
          >
            ↩ সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
};

export default Sesstion;
