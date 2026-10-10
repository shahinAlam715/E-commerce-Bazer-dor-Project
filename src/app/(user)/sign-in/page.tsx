"use client";

import React from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import toast from "react-hot-toast";

const SignInPage = () => {

  const handleSubmit: React.ComponentProps<typeof Form>["onSubmit"] =
  async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);

    const user = Object.fromEntries(formdata.entries()) as {
      name: string;
      image: string;
      email: string;
      password: string;
    };

    console.log(user);

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });
    
        if (data) {
            toast.success("Sign In Successfull !")
        }
        if (error) {
            toast.error("Something went Rong !")
        }
    
      };
  
  
  const handlegoogle = async()=>{
      const data = await authClient.signIn.social({
     provider: "google",
   });

    if (data) {
            toast.success("Sign In Successfull !")
        }

   }
   const handlegithub = async()=>{
      const data = await authClient.signIn.social({
     provider: "github",
   });

    if (data) {
            toast.success("Sign In Successfull !")
        }

   }

  return (
    <div className="my-16 container mx-auto p-2">
      <h2 className="text-3xl font-bold text-black text-center">
        সাইন ইন
      </h2>

      <p className="text-xl font-bold text-black text-center my-4 px-4">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
        <Form
          className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-white p-8 shadow-lg"
          onSubmit={handleSubmit}
        >
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label>ইমেইল</Label>
            <Input
              placeholder="you@example.com"
              autoComplete="email"
            />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            minLength={8}
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }

              return null;
            }}
          >
            <Label>পাসওয়ার্ড</Label>
            <Input
              placeholder="কমপক্ষে ৮ অক্ষর"
              autoComplete="current-password"
            />
            <Description>
              Must be at least 8 characters
            </Description>
            <FieldError />
          </TextField>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="w-full bg-green-700 text-white"
            >
              সাইন ইন
            </Button>
          </div>
        </Form>

        <div className="bg-white p-4 my-4 rounded-2xl w-full max-w-sm">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              className="bg-gray-100 px-4 py-2 rounded-xl flex items-center"
              onClick={handlegoogle}
            >
              <span className="mx-1">
                <FcGoogle />
              </span>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              className="bg-gray-100 px-4 py-2 rounded-xl flex items-center"
              onClick={handlegithub}
            >
              <span className="mx-1">
                <FaGithub />
              </span>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="text-xl text-center mt-4">
            অ্যাকাউন্ট নেই?{" "}
            <span className="text-green-600">
              <Link href="/sign-up">সাইন আপ করুন</Link>
            </span>
          </p>
        </div>
      </div>

      <Link href="/">
        <p className="text-xl text-gray-500 text-center">
          ← হোম পেজে ফিরে যান
        </p>
      </Link>
    </div>
  );
};

export default SignInPage;