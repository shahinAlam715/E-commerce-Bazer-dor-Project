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

const SignUpPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        console.error("Signup error:", error);
        alert(error.message || "Signup failed");
        return;
      }

      console.log("Signup success:", data);
      alert("Account created successfully!");
    } catch (err) {
      console.error("Unexpected signup error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

   const handlegoogle = async()=>{
     const data = await authClient.signIn.social({
    provider: "google",
  });
  }
  const handlegithub = async()=>{
     const data = await authClient.signIn.social({
    provider: "github",
  });
}

  


  return (
    <div className="">

    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Form
        className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-white p-6 shadow-lg"
        onSubmit={onSubmit}
      >
        <h1 className="text-2xl font-bold">Create Account</h1>

        <TextField isRequired name="name">
          <Label>Name</Label>
          <Input placeholder="Enter your name" />
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
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
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
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>Must be at least 8 characters</Description>
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">Sign Up</Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
      <div className="flex justify-center gap-4">
        <button className="bg-green-500 px-4 py-2" onClick={handlegoogle}>Google দিয়ে চালিয়ে যান</button>
        <button className="bg-red-500 px-4 py-2" onClick={handlegithub}>GitHub দিয়ে চালিয়ে যান</button>
      </div>
    </div>
  );
};

export default SignUpPage;