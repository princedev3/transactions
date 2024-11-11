"use server";
import prisma from "@/libs/prisma";
import { UserId } from "./get-user";
import { revalidatePath } from "next/cache";

interface deleteProps {
  error?: string;
  success?: string;
}
export const deleteTransaction = async (id: number): Promise<deleteProps> => {
  try {
    const user = await UserId();
    await prisma.transaction.delete({
      where: {
        id,
        userId: user?.id,
      },
    });
    revalidatePath("/");
    return { success: " transaction deleted" };
  } catch (error) {
    console.log(error);
    return { error: "can not delete transaction" };
  }
};
