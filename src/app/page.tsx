import AddHistory from "@/components/add-history";
import AddTransaction from "@/components/add-transaction";
import Balance from "@/components/balance";
import Expense from "@/components/expense";
import ShowName from "@/components/show-name";

export default function Home() {
  return (
    <div className="grid md:grid-flow-col  gap-0  px-10 md:px-20 lg:px-40  m-0 ">
      <div className="w-full  rounded-md shadow-sm p-6">
        <ShowName />
        <Balance />
        <Expense />
        <div className=" mt-6 w-full">
          <AddTransaction />
        </div>{" "}
      </div>
      <div className="w-full   m-0">
        <AddHistory />
      </div>
    </div>
  );
}
