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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!name) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error("অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

      form.reset();
    } catch (err) {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  const handleGoogle = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error("Google দিয়ে লগইন করা যায়নি");
      }
    } catch (err) {
      toast.error("Google login-এ সমস্যা হয়েছে");
    }
    toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
  };

  const handleGithub = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error("GitHub দিয়ে লগইন করা যায়নি");
      }
    } catch (err) {
      toast.error("GitHub login-এ সমস্যা হয়েছে");
    }

    toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
  };

  return (
    <div className="my-16 container mx-auto">
      <h2 className="text-3xl font-bold text-black text-center">
        অ্যাকাউন্ট তৈরি করুন
      </h2>

      <p className="text-xl font-bold text-black my-4 text-center">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
        <Form
          className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-white p-8 shadow-lg"
          onSubmit={onSubmit}
        >
          <TextField isRequired name="name">
            <Label>নাম</Label>
            <Input placeholder="যেমন: রহিম উদ্দিন" autoComplete="name" />
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
            <Input placeholder="you@example.com" autoComplete="email" />
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
            <Input placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="new-password" />
            <Description>Must be at least 8 characters</Description>
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
            <Input placeholder="আবার লিখুন" autoComplete="new-password" />
            <Description>Must match your password</Description>
            <FieldError />
          </TextField>

          <div className="flex gap-2">
            <Button type="submit" className="bg-green-700 text-white">
              অ্যাকাউন্ট তৈরি করুন
            </Button>
          </div>
        </Form>

        <div className="bg-white p-4 my-4 rounded-2xl">
          <div className="flex flex-wrap justify-center gap-4">
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
            অ্যাকাউন্ট আছে?{" "}
            <span className="text-green-600">
              <Link href="/sign-in">সাইন ইন করুন</Link>
            </span>
          </p>
        </div>
      </div>

      <Link href={"/"}>
        <p className="text-xl text-gray-500 text-center">← হোম পেজে ফিরে যান</p>
      </Link>
    </div>
  );
};

export default SignUpPage;
