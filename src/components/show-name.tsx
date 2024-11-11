"use client";
import { RemoveNullContext } from "@/libs/context";
import React from "react";

const ShowName = () => {
  const { currentUser } = RemoveNullContext();
  return (
    <div>
      <h1 className="mx-auto  capitalize font-medium text-3xl">
        welcome {currentUser?.name}{" "}
      </h1>
    </div>
  );
};

export default ShowName;
