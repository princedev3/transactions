import prisma from "@/libs/prisma";
import { UserId } from "./get-user";

interface TransactionResult {
  balance?: number;
  error?: string;
}

export async function checkBalance(): Promise<TransactionResult> {
  try {
    const user = await UserId();
    const allTransaction = await prisma.transaction.findMany({
      where: {
        userId: user?.id,
      },
    });
    const balance = allTransaction.reduce(
      (acc, curr) => (acc += curr.amount),
      0
    );
    return { balance };
  } catch (error) {
    return { error: "can not get balance" };
  }
}
