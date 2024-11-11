"use client";
import React, { useState } from "react";
import { InputBaseProps } from "../types";
import RequiredField from "@/ui/required-field";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { IoIosCheckmark } from "react-icons/io";
export default function PasswordInput({
  label,
  onChange,
  placeholder,
  id,
  name,
  required,
  defaultValue,
  readonly,
  className,
}: InputBaseProps) {
  const [onInValid, setOnInvalid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasSpecialChar: false,
  });
  const handleOnChange = (e: React.ChangeEvent) => {
    onChange?.(e);
    setOnInvalid(false);
  };
  const handleOnInvalid = () => {
    setOnInvalid(true);
  };

  const handleVisiblePassword = () => {
    setIsVisible(!isVisible);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    onChange?.(e);
    setOnInvalid(false);
    setPasswordCriteria({
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    });
  };
  return (
    <div className={"grid gap-y-2"}>
      <label htmlFor={id} className={`capitalize font-medium`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          className={`${className} w-full capitalize  border rounded-md p-2 outline-none placeholder:font-thin`}
          id={id}
          minLength={6}
          type={isVisible ? "password" : "text"}
          placeholder={placeholder}
          onChange={handlePasswordChange}
          name={name}
          onInvalid={handleOnInvalid}
          required={required}
          defaultValue={defaultValue}
          readOnly={readonly}
        />
        <div
          onClick={handleVisiblePassword}
          className="absolute right-2 top-[35%] "
        >
          {!isVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </div>
      </div>
      {/* Required Field Message */}
      {onInValid && (
        <RequiredField label={label ? label : placeholder ? placeholder : ""} />
      )}
      <div className="mt-2 flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <p
            className={`${
              passwordCriteria.hasUppercase ? "bg-blue-600 border-blue-600" : ""
            } border rounded-full`}
          >
            <IoIosCheckmark className="text-white w-5 h-5" />
          </p>
          <p
            className={`${
              passwordCriteria.hasUppercase
                ? " text-blue-600  "
                : "text-gray-400 "
            } text-[12px] `}
          >
            Password must contain uppercase
          </p>
        </div>

        <div className="flex items-center gap-4">
          <p
            className={`${
              passwordCriteria.hasSpecialChar
                ? "bg-blue-600 border-blue-600"
                : ""
            } border rounded-full`}
          >
            <IoIosCheckmark className="text-white w-5 h-5" />
          </p>
          <p
            className={`${
              passwordCriteria.hasSpecialChar
                ? " text-blue-600  "
                : "text-gray-400 "
            } text-[12px] `}
          >
            Password must contain special-character
          </p>
        </div>

        <div className="flex items-center gap-4">
          <p
            className={`${
              passwordCriteria.hasLowercase ? "bg-blue-600 border-blue-600" : ""
            } border rounded-full`}
          >
            <IoIosCheckmark className="text-white w-5 h-5" />
          </p>
          <p
            className={`${
              passwordCriteria.hasLowercase
                ? " text-blue-600  "
                : "text-gray-400 "
            } text-[12px] `}
          >
            Password must contain lowercase
          </p>
        </div>
      </div>
    </div>
  );
}
