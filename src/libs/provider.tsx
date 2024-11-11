"use client";
import React from "react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "@/app/api/apiSlice";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApiProvider api={apiSlice}>{children}</ApiProvider>;
}
