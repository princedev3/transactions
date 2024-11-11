"use client";
import { Button } from "@/ui/button";
import NumberInput from "@/ui/input/number-input";
import TextInput from "@/ui/input/text-input";
import React, { useRef } from "react";
import { addTransaction } from "./actions/addTransaction";
import toast from "react-hot-toast";
import { checkBalance } from "./actions/getBalance";

const AddTransaction = () => {
  const ref = useRef<HTMLFormElement>(null);
  const handleTransaction = async (formdata: FormData) => {
    const { data, error } = await addTransaction(formdata);
    await checkBalance();
    if (error) {
      toast.error(error);
    } else {
      toast.success("transaction added");
      ref.current?.reset();
    }
  };
  return (
    <div className="grid gap-y-4">
      <h1 className="font-semibold text-lg ">Add transaction</h1>
      <form ref={ref} action={handleTransaction} className="grid gap-7">
        <TextInput label="title " id="title" name="title" required />
        <NumberInput label="Enter amount " id="amount" name="amount" required />
        <Button variant="filled" type="submit" className="w-full">
          Add transaction
        </Button>
      </form>
    </div>
  );
};

export default AddTransaction;
