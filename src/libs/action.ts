"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Payload } from "@/general-types";

function checkToken(token: string, secret: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        reject(error);
      }
      resolve(decoded);
    });
  });
}
export const verifyToken = async (digit: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return new NextResponse(JSON.stringify({ message: "not allowed" }), {
      status: 500,
    });
  }
  const payload = await checkToken(
    token.value,
    process.env.NEXT_PUBLIC_JWT_SECRETE as string
  );
  const tokenString = (payload as Payload).token as string;
  const id = (payload as Payload).id as number;
  const tokenMatch = bcrypt.compareSync(digit, tokenString as string);
  if (!tokenMatch) {
    return new NextResponse(JSON.stringify({ message: "not allowed" }), {
      status: 500,
    });
  }
  return {
    id,
    digit,
  };
};

export const handleLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.set("tokenLogin", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "strict",
    secure: false,
  });
};
