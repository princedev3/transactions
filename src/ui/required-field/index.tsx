"use client";
import { CiCircleAlert } from "react-icons/ci";

export default function RequiredField({ label }: { label: string }) {
  return (
    <div className="grid grid-flow-col w-max gap-1">
      <CiCircleAlert size={15} color="#ff5f15" />
      <p className="text-[#ff5f15] text-xs">{label} is required.</p>
    </div>
  );
}
