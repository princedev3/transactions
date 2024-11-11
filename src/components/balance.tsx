import React from "react";
import { checkBalance } from "./actions/getBalance";

const Balance = async () => {
  const balance = await checkBalance();
  return (
    <div>
      <h1 className="capitalize text-2xl mt-5">your balance:</h1>
      <p className="font-semibold text-2xl">
        ${" "}
        {new Intl.NumberFormat("en-US").format(
          Number(balance && balance?.balance)
        ) ?? 0}{" "}
      </p>
    </div>
  );
};

export default Balance;
