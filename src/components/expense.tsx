import React from "react";
import { calcExpense } from "./actions/calc-expense";

const Expense = async () => {
  const { expense, income } = await calcExpense();
  return (
    <div className="mt-5 grid items-center ">
      <div className="grid grid-flow-col h-[20vh] shadow-sm  rounded-lg ">
        <div className=" grid place-content-center border-r">
          <h1 className="mx-auto uppercase text-xl font-bold">income</h1>
          <h1 className="mx-auto uppercase text-lg font-semibold text-green-700">
            ${" "}
            {new Intl.NumberFormat("en-US").format(
              Number(Math.abs(Number(income && income?.toFixed(1))))
            )}
          </h1>
        </div>

        <div className=" grid place-content-center">
          <h1 className="mx-auto uppercase text-xl font-bold">expense</h1>
          <h1 className="mx-auto uppercase text-lg font-semibold text-red-700">
            ${" "}
            {new Intl.NumberFormat("en-US").format(
              Number(Math.abs(Number(expense && expense?.toFixed(1))))
            )}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Expense;
