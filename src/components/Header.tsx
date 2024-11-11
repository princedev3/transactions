"use client";
import { handleLogout } from "@/libs/action";
import { RemoveNullContext } from "@/libs/context";
import { Button } from "@/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";

const Header = () => {
  const { currentUser, setCurrentUser } = RemoveNullContext();
  const router = useRouter();
  const logoutUser = async () => {
    setCurrentUser(null);
    const res = await handleLogout();
    router.push("/login");
  };
  return (
    <div className="h-20  shadow-sm grid justify-around grid-flow-col items-center">
      <h1 className="text-xl font-semibold ">Expense Tracker</h1>
      {!currentUser ? (
        <Button
          type="button"
          variant="filled"
          className="capitalize cursor-pointer"
        >
          <Link href={"/login"}>login</Link>
        </Button>
      ) : (
        <form action={logoutUser}>
          <Button
            type="submit"
            variant="filled"
            className="capitalize cursor-pointer"
          >
            logout
          </Button>
        </form>
      )}
    </div>
  );
};

export default Header;
