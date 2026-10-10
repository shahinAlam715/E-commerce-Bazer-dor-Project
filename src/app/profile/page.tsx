"use client";

import { authClient } from "@/lib/auth-client";
import { FieldError, Input, Label, TextField } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Profile = () => {
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handlesignOut = async () => {
    toast.success("Sign Out Successfull !");
    await authClient.signOut();
    router.replace("/");
    router.refresh();
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updateUser = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.updateUser({
      ...updateUser,
    });

    if (error) {
      console.error("Update failed:", error.message);
      return;
    }

    toast.success("User updated Successful!");
  };

  return (
    <div className="container mx-auto my-16">
      <div>
        <h2 className="text-3xl font-bold text-black">আমার প্রোফাইল</h2>

        <p className="my-4 text-xl font-bold text-black">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        <div className="my-5 flex justify-between rounded-2xl bg-white p-4">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="h-24 w-24 overflow-hidden rounded-full">
                    <Image
                      src={
                        user?.image ||
                        "https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                      }
                      alt="User Avatar"
                      height={60}
                      width={60}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2>{user?.name}</h2>
              <h3>{user?.email}</h3>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="border-red-500 px-4 py-2 text-red-500"
              onClick={handlesignOut}
            >
              ↩ সাইন আউট
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4">
          <h2 className="text-3xl font-bold text-black">তথ্য</h2>

          <form onSubmit={handleUpdate}>
            <TextField isRequired name="name" className="my-4">
              <Label>নাম</Label>

              <Input placeholder="যেমন: রহিম উদ্দিন" autoComplete="name" />

              <FieldError />
            </TextField>

            <button type="submit" className="bg-green-600 px-6 py-2 text-white">
              আপডেট
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
