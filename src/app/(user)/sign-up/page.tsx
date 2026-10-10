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
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const SignUpPage = () => {
 
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

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
            toast.success("Sign In Successfull !")
            redirect("/")
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
            redirect("/")
        }
        

  }
  const handlegithub = async()=>{
     const data = await authClient.signIn.social({
    provider: "github",
  });

   if (data) {
            toast.success("Sign In Successfull !")
            redirect("/")
        }

  }

  return (
    <div className="container mx-auto my-16 px-2">
      <h2 className="text-center text-3xl font-bold text-black">
        অ্যাকাউন্ট তৈরি করুন
      </h2>

      <p className="my-4 text-center text-xl font-bold text-black">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <Form
          className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-white p-8 shadow-lg"
          onSubmit={handleSubmit}
        >
         
          <TextField isRequired name="name">
            <Label>নাম</Label>
            <Input
              placeholder="যেমন: রহিম উদ্দিন"
              autoComplete="name"
            />
            <FieldError />
          </TextField>

         
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
              autoComplete="new-password"
            />
            <Description>
              Must be at least 8 characters
            </Description>
            <FieldError />
          </TextField>

          
          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            minLength={8}
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }

              return null;
            }}
          >
            <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input
              placeholder="আবার লিখুন"
              autoComplete="new-password"
            />
            <Description>
              Must match your password
            </Description>
            <FieldError />
          </TextField>

          
          <Button
            type="submit"
            className="w-full bg-green-700 text-white"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Button>
        </Form>

        
        <div className="my-4 w-full max-w-sm rounded-2xl bg-white p-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              className="flex items-center rounded-xl bg-gray-100 px-4 py-2"
              onClick={handlegoogle}
            >
              <span className="mx-1">
                <FcGoogle />
              </span>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              className="flex items-center rounded-xl bg-gray-100 px-4 py-2"
              onClick={handlegithub}
            >
              <span className="mx-1">
                <FaGithub />
              </span>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-4 text-center text-xl">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="text-green-600 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>

      
      <Link href="/">
        <p className="text-center text-xl text-gray-500 hover:text-green-700">
          ← হোম পেজে ফিরে যান
        </p>
      </Link>
    </div>
  );
};

export default SignUpPage;