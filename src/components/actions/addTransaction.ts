"use server";
import prisma from "@/libs/prisma";
import { UserId } from "./get-user";
import { revalidatePath } from "next/cache";

interface TransactionData {
  text: string;
  amount: number;
  userId: number;
}
interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

export async function addTransaction(
  formdata: FormData
): Promise<TransactionResult> {
  const textValue = formdata.get("title");
  const amountValue = formdata.get("amount");
  if (!textValue || !amountValue || textValue === "") {
    return { error: "Text or ammount is missing" };
  }
  const text: string = textValue.toString();
  const amount: number = parseFloat(amountValue.toString());
  const user = await UserId();

  const transactionData: TransactionData = {
    text,
    amount,
    userId: user?.id as number,
  };
  try {
    const createTransactions = await prisma.transaction.create({
      data: transactionData,
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return { error: "transaction not added" };
  }
  return { data: transactionData };
}
