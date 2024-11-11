"use client";
// import { RemoveNullContext } from "@/libs/context";
import { Button } from "@/ui/button";
import Link from "next/link";
import React from "react";

const Guest = () => {
  return (
    <div className="grid grid-flow-row  justify-center gap-y-7 pt-5 ">
      <h1 className="mx-auto font-semibold text-3xl capitalize">welcome</h1>
      <p className="mx-auto font-medium text-lg">
        Please sign in to manage your transactions
      </p>
      <Button
        type="button"
        variant="filled"
        className="capitalize cursor-pointer mx-auto"
      >
        <Link href={"/"}>sign in</Link>
      </Button>
    </div>
  );
};

export default Guest;
