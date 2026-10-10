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

const SignUpPage = () => {
  // Email signup
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(
      formData.get("confirmPassword") ?? ""
    );

    // Validation
    if (!name) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (!email) {
      toast.error("আপনার ইমেইল লিখুন");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    const toastId = toast.loading("অ্যাকাউন্ট তৈরি হচ্ছে...");

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error("অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।", {
          id: toastId,
        });
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!", {
        id: toastId,
      });

      form.reset();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        id: toastId,
      });
    }
  };

  // Google signup / sign-in
  const handleGoogle = async () => {
    const toastId = toast.loading("Google দিয়ে সংযোগ করা হচ্ছে...");

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error("Google দিয়ে সাইন আপ করা যায়নি", {
          id: toastId,
        });
      }

      // OAuth redirect হলে পরবর্তী পেজে session যাচাই করে
      // success toast দেখানো ভালো।
    } catch {
      toast.error("Google login-এ সমস্যা হয়েছে", {
        id: toastId,
      });
    }
  };

  // GitHub signup / sign-in
  const handleGithub = async () => {
    const toastId = toast.loading("GitHub দিয়ে সংযোগ করা হচ্ছে...");

    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error("GitHub দিয়ে সাইন আপ করা যায়নি", {
          id: toastId,
        });
      }

      // OAuth redirect হলে callback-এর পর session যাচাই করুন।
    } catch {
      toast.error("GitHub login-এ সমস্যা হয়েছে", {
        id: toastId,
      });
    }
  };

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
          onSubmit={onSubmit}
        >
          {/* Name */}
          <TextField isRequired name="name">
            <Label>নাম</Label>
            <Input
              placeholder="যেমন: রহিম উদ্দিন"
              autoComplete="name"
            />
            <FieldError />
          </TextField>

          {/* Email */}
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

          {/* Password */}
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

          {/* Confirm Password */}
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-green-700 text-white"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Button>
        </Form>

        {/* Social Authentication */}
        <div className="my-4 w-full max-w-sm rounded-2xl bg-white p-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              className="flex items-center rounded-xl bg-gray-100 px-4 py-2"
              onClick={handleGoogle}
            >
              <span className="mx-1">
                <FcGoogle />
              </span>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              className="flex items-center rounded-xl bg-gray-100 px-4 py-2"
              onClick={handleGithub}
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

      {/* Back to Home */}
      <Link href="/">
        <p className="text-center text-xl text-gray-500 hover:text-green-700">
          ← হোম পেজে ফিরে যান
        </p>
      </Link>
    </div>
  );
};

export default SignUpPage;