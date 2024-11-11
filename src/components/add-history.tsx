import React from "react";
import { getAllTransactions } from "./actions/get-all-transactions";
import TransactionList from "./transaction-list";

const AddHistory = async () => {
  const { data, error } = await getAllTransactions();
  if (error) {
    return <p className="text-red-500">{error} </p>;
  }

  return (
    <div className="px-4">
      <h1 className="font-semibold text-lg capitalize my-3">
        Transaction history
      </h1>
      <div className="grid gap-y-2">
        {data?.map((item, index) => (
          <TransactionList item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default AddHistory;
