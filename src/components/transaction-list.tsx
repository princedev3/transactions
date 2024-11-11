"use client";
import { Transaction } from "@prisma/client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdDelete } from "react-icons/md";
import { Button } from "@/ui/button";
import { deleteTransaction } from "./actions/delete-transaction";
import toast from "react-hot-toast";

const TransactionList = ({ item }: { item: Transaction }) => {
  const [showDelete, setShowDelete] = useState(false);
  const handleDelete = async (formdata: FormData) => {
    const id = formdata.get("id") as string;
    const res = await deleteTransaction(Number(id));
    toast.success(res.success as string);
  };
  return (
    <div
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      className={`${
        item.amount > 0 ? "border-green-600" : "border-red-600"
      } p-2 shadow-sm border-r-4 grid grid-flow-col justify-between relative`}
    >
      <div className="capitalize flex gap-1 items-center">
        <span className="">{item.text}</span>
        {showDelete && (
          <div
            className=" flex items-center justify-center"
            onMouseEnter={() => setShowDelete(true)}
            onMouseLeave={() => setShowDelete(false)}
          >
            <Dialog>
              <DialogTrigger>
                <MdDelete className="text-red-500  cursor-pointer" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    invoice and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <form action={handleDelete} className="w-full ">
                    <input
                      type="hidden"
                      name="id"
                      value={item?.id}
                      className="hidden"
                    />
                    <Button
                      type="submit"
                      variant="filled"
                      className="capitalize w-full"
                    >
                      delete
                    </Button>
                  </form>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}{" "}
      </div>
      <p className="">
        {new Intl.NumberFormat("en-US").format(Number(Math.abs(item.amount)))}{" "}
      </p>
    </div>
  );
};

export default TransactionList;
