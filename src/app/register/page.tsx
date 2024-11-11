"use client";
import { Button } from "@/ui/button";
import EmailInput from "@/ui/input/email-input";
import PasswordInput from "@/ui/input/password-input";
import TextInput from "@/ui/input/text-input";
import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../api/apiSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const router = useRouter();

  const handleInputChange = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const isComplete = Boolean(password) && Boolean(email) && Boolean(name);
    setIsFormComplete(isComplete);
    e.preventDefault();
  };
  const [register, { isLoading, data, isSuccess, isError }] =
    useRegisterMutation();
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const target = e.currentTarget as HTMLFormElement;
    const formdata = new FormData(target);
    const name = formdata.get("name") as string;
    const password = formdata.get("password") as string;
    const email = formdata.get("email") as string;
    const handlingRegister = await register({ name, email, password });
    setLoading(false);
    target.reset();
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/verify-email");
    }
    if (isError) {
      toast.error("something went wrong");
    }
  }, [isLoading, data]);

  return (
    <div className="grid items-center relative h-screen">
      <div className="grid max-w-[450px] w-full mx-auto   p-7 rounded-lg shadow-lg ">
        <div className="mx-auto mb-5">
          <h1 className="mx-auto text-primary font-bold text-xl ">
            @Transactions
          </h1>
        </div>
        <form
          action=""
          onSubmit={handleRegister}
          onInput={handleInputChange}
          className="grid gap-y-5"
        >
          <TextInput
            id="name"
            name="name"
            label="names"
            placeholder="Enter your name"
            required
          />
          <EmailInput
            id="email"
            name="email"
            label="email"
            placeholder="Enter your email"
            required
          />
          <PasswordInput
            id="password"
            name="password"
            label="password"
            placeholder="Enter your password"
            required
          />
          <Button
            disabled={loading || !isFormComplete || isLoading}
            isLoading={loading}
            variant="filled"
            type="submit"
            className="mt-3 disabled:cursor-not-allowed"
          >
            create an account
          </Button>
        </form>
      </div>
    </div>
  );
}
