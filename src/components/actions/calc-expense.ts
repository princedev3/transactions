import prisma from "@/libs/prisma";
import { UserId } from "./get-user";

interface income {
  error?: string;
  income?: number;
  expense?: number;
}

export const calcExpense = async (): Promise<income> => {
  try {
    const user = await UserId();
    const allTransaction = await prisma.transaction.findMany({
      where: {
        userId: user?.id,
      },
    });
    const income = allTransaction
      .map((item) => item.amount)
      .filter((item) => item > 0)
      .reduce((acc, curr) => (acc += curr), 0);
    const expense = allTransaction
      .map((item) => item.amount)
      .filter((item) => item < 0)
      .reduce((acc, curr) => (acc += curr), 0);
    return { income, expense };
  } catch (error) {
    return { error: "can not get income/expense" };
  }
};
