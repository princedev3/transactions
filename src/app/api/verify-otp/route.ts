import { verifyToken } from "@/libs/action";
import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const result = await verifyToken(String(body));
    let userId;
    let userDetail;
    if ("id" in result && "digit" in result) {
      const { id, digit } = result;
      userId = id;
      userDetail = digit;
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { active: true },
    });
    return new NextResponse(JSON.stringify({ email: updatedUser.email }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "can not verify email" }),
      { status: 500 }
    );
  }
};
