"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Sesstion = () => {
  const [showprofile, setshowprofile] = useState(false);
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const handleprofile = ()=>{
    setshowprofile(!showprofile)
  }


  const handlesignOut = async()=>{
    await authClient.signOut();
    setshowprofile(false)
  }
  

  return (
    <div className="relative">
      {user ? (
        <div className="flex items-center gap-3">
          {user.image ? (
            <div className="avatar">
              <div className="w-12 rounded-full">
                <Image
                  src={user.image}
                  alt="User Avatar"
                  height={60}
                  width={60}
                />
              </div>
            </div>
          ) : (
            <div className="avatar">
              <div className="w-12 rounded-full">
                <Image
                  src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                  alt="User Avatar"
                  height={60}
                  width={60}
                />
              </div>
            </div>
          )}

          <h2 className="text-lg font-semibold">{user?.name}</h2>
          <span onClick={handleprofile}>
            <i className="text-[24px]">
              <IoMdArrowDropdown />
            </i>
          </span>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link href={"/sign-in"}>
            <button className="h-8 w-20 sm:h-10 sm:w-30 text-black">
              সাইন ইন
            </button>
          </Link>
          <Link href={"/sign-up"}>
            <button className="bg-[#1A9951] h-8 w-20 sm:h-10 sm:w-30 text-white">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}

    {showprofile &&
      <div className="bg-white p-4 flex flex-col rounded-xl absolute top-12 right-3 z-10">
        <h2 className="text-2xl font-bold">{user?.name}</h2>
        <h3 className="text-xl font-medium">{user?.email}</h3>
        <button className="box-border bg-gray-100 px-4 py-2 my-2">
          👤 আমার প্রোফাইল
        </button>
        <button className="box-border bg-gray-100 px-4 py-2 text-red-500" onClick={handlesignOut}>
          ↩ সাইন আউট
        </button>
      </div>
    }

    </div>
  );
};

export default Sesstion;
