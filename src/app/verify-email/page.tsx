"use client";
import { Button } from "@/ui/button";
import OtpInput from "@/ui/input/otp-input";
import { Otp } from "@/ui/input/types";
import React, { useEffect, useState } from "react";
import { useVerifyOtpMutation } from "../api/apiSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<Otp>({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
  });
  const router = useRouter();
  const [verifyOtp, { isLoading, data, isSuccess, isError }] =
    useVerifyOtpMutation();
  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const handleVerify = await verifyOtp(Object.values(otp).join(""));
    setEmail(handleVerify.data?.email as string);
    setLoading(false);
  };
  const isFormComplete =
    Boolean(otp.digit1) &&
    Boolean(otp.digit2) &&
    Boolean(otp.digit3) &&
    Boolean(otp.digit4);

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
    if (isError) {
      toast.error("something went wrong");
    }
  }, [isLoading, data]);

  return (
    <div className="grid w-full h-screen items-center ">
      <div className="grid w-full max-w-[450px] mx-auto shadow-md rounded-lg p-7">
        <div className="mx-auto mb-5">
          <h1 className="mx-auto text-primary font-bold text-xl ">
            @Transactions
          </h1>
          <p className="text-primary/60 font-medium mt-2">
            Kindly, verify your email
          </p>
        </div>
        <form onSubmit={handleVerifyOtp} className="">
          <OtpInput otp={otp} setOtp={setOtp} />
          <Button
            disabled={!isFormComplete || loading}
            variant="filled"
            type="submit"
            className="w-full mt-10 py-3 capitalize text-lg disabled:cursor-not-allowed"
          >
            submit
          </Button>
        </form>
      </div>
    </div>
  );
}
