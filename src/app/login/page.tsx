"use client";
import { useLoginMutation } from "@/app/api/apiSlice";
import { RemoveNullContext } from "@/libs/context";
import { Button } from "@/ui/button";
import EmailInput from "@/ui/input/email-input";
import PasswordInput from "@/ui/input/password-input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function EmailPage() {
  const { updatedUser } = RemoveNullContext();
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [login] = useLoginMutation();
  const router = useRouter();
  const handleInputSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData(e.currentTarget as HTMLFormElement);
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;
    const handleLogin = await login({ email, password });
    if (handleLogin.data) {
      updatedUser(handleLogin.data);
      router.push("/");
    } else {
      toast.error("something went wrong");
    }

    setLoading(false);
  };
  const handleInputChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget as HTMLFormElement);
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;
    setIsFormComplete(Boolean(email) && Boolean(password));
  };

  return (
    <div className="grid items-center h-screen ">
      <form
        onInput={handleInputChange}
        onSubmit={handleInputSubmit}
        className="grid max-w-[450px] gap-y-5 w-full mx-auto shadow-md p-7 rounded-lg "
      >
        <div className="mx-auto mb-5">
          <h1 className="mx-auto text-primary font-bold text-xl ">
            @Transactions
          </h1>
        </div>
        <EmailInput
          id="email"
          label="email"
          required
          name="email"
          placeholder={"Enter your email"}
        />
        <PasswordInput
          id="password"
          label="password"
          required
          name="password"
        />
        <Button
          disabled={!isFormComplete || loading}
          variant="filled"
          type="submit"
          className="disabled:cursor-not-allowed capitalize tracking-wide"
        >
          login
        </Button>
      </form>
    </div>
  );
}
