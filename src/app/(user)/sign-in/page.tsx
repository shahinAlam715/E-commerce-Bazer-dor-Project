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
  // Email and password sign-in
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    const toastId = toast.loading("সাইন ইন হচ্ছে...");

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়", {
          id: toastId,
        });
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!", {
        id: toastId,
      });
    } catch {
      toast.error("সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        id: toastId,
      });
    }
  };

  // Google sign-in
  const handleGoogle = async () => {
    const toastId = toast.loading("Google দিয়ে সাইন ইন হচ্ছে...");

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error("Google দিয়ে লগইন করা যায়নি", {
          id: toastId,
        });
      }
    } catch {
      toast.error("Google login-এ সমস্যা হয়েছে", {
        id: toastId,
      });
    }
  };

  // GitHub sign-in
  const handleGithub = async () => {
    const toastId = toast.loading("GitHub দিয়ে সাইন ইন হচ্ছে...");

    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error("GitHub দিয়ে লগইন করা যায়নি", {
          id: toastId,
        });
      }
    } catch {
      toast.error("GitHub login-এ সমস্যা হয়েছে", {
        id: toastId,
      });
    }
  };

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
          onSubmit={onSubmit}
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
              onClick={handleGoogle}
            >
              <span className="mx-1">
                <FcGoogle />
              </span>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              className="bg-gray-100 px-4 py-2 rounded-xl flex items-center"
              onClick={handleGithub}
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