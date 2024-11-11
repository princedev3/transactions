"use client";
import React, { useState } from "react";
import { InputBaseProps } from "../types";
import RequiredField from "@/ui/required-field";
export default function EmailInput({
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
  const handleOnChange = (e: React.ChangeEvent) => {
    onChange?.(e);
    setOnInvalid(false);
  };
  const handleOnInvalid = () => {
    setOnInvalid(true);
  };

  return (
    <div className={"grid gap-y-2"}>
      <label htmlFor={id} className={`capitalize font-medium`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div>
        <input
          className={`${className} w-full capitalize  border rounded-md p-2 outline-none placeholder:font-thin`}
          id={id}
          type={"email"}
          placeholder={placeholder}
          onChange={handleOnChange}
          name={name}
          onInvalid={handleOnInvalid}
          required={required}
          defaultValue={defaultValue}
          readOnly={readonly}
        />
      </div>
      {/* Required Field Message */}
      {onInValid && (
        <RequiredField label={label ? label : placeholder ? placeholder : ""} />
      )}
    </div>
  );
}
