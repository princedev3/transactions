"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const UserId = async () => {
  const cookiesList = await cookies();
  const loginToken = cookiesList.get("tokenLogin")?.value as string;
  if (!loginToken) {
    return null;
  }
  const userData = jwt.verify(
    loginToken,
    process.env.NEXT_PUBLIC_JWT_SECRETE as string
  );
  const id = (userData as jwt.JwtPayload).id as number;
  return {
    id,
  };
};
