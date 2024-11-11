import React from "react";
import { Otp } from "../types";

interface OtpInputProp {
  otp: Otp;
  setOtp: React.Dispatch<React.SetStateAction<Otp>>;
}

export type Otps = {
  digit1: string;
  digit2: string;
  digit3: string;
  digit4: string;
};
export default function OtpInput({ otp, setOtp }: OtpInputProp) {
  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof Otp
  ) => {
    const value = e.target.value;
    if (value.length > 1) return;
    setOtp((prev: Otp) => ({ ...prev, [name]: value } as Otp));
    const nextSibling = e.target.nextSibling as HTMLElement | null;
    if (value && nextSibling && "focus" in nextSibling) {
      nextSibling.focus();
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text");
    const digits = pasteData.split("");
    setOtp({
      digit1: digits[0] || "",
      digit2: digits[1] || "",
      digit3: digits[2] || "",
      digit4: digits[3] || "",
    });
    e.preventDefault();
  };
  return (
    <div className="grid grid-flow-col  justify-between mt-7">
      <input
        type="text"
        className=" border rounded-md w-16 h-16  text-center text-xl appearance-none"
        maxLength={1}
        value={otp.digit1}
        onChange={(e) => handleChange(e, "digit1")}
        onPaste={handlePaste}
      />
      <input
        type="text"
        className=" border rounded-md w-16 h-16  text-center text-xl appearance-none"
        maxLength={1}
        value={otp.digit2}
        onChange={(e) => handleChange(e, "digit2")}
      />
      <input
        type="text"
        className=" border rounded-md w-16 h-16  text-center text-xl appearance-none"
        maxLength={1}
        value={otp.digit3}
        onChange={(e) => handleChange(e, "digit3")}
      />
      <input
        type="text"
        className=" border rounded-md w-16 h-16  text-center text-xl appearance-none"
        maxLength={1}
        value={otp.digit4}
        onChange={(e) => handleChange(e, "digit4")}
      />
    </div>
  );
}
