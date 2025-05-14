"use client";

import { Models } from "node-appwrite";
import React from "react";
import Status from "./shared/Status";
import { formatCurrency, formatDate, getTableData } from "@/lib/utils";
import CustomTable from "./shared/table/CustomTable";
import { orderDetails } from "./shared/table/columns";
import Link from "next/link";
import { Button } from "./ui/button";
import { useUpdateTransactionStatus } from "@/lib/queries/cartQueries/cart";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

const AdminTransactionView = ({ info }: { info: Models.Document }) => {
  const { mutateAsync: updateStatus, isPending: loading } =
    useUpdateTransactionStatus();

  const date = formatDate(info.$createdAt);
  const total = formatCurrency(info.total);

  // generate the order table data
  const tableData = getTableData(info);

  const handleClick = async () => {
    try {
      const res = await updateStatus({ id: info.$id, status: "COMPLETED" });

      if (!res.status) return toast.error(res.message);

      return toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <article className="w-full overflow-y-scroll no-scrollbar">
      <div className="py-3 px-1 mt-6 flex-between">
        <h1 className="text-lg lg:text-xl font-medium">#{info.$id}</h1>

        <Status status={info.status} />
      </div>
      <div>
        <span className="text-dark-200 text-xs lg:text-sm font-medium">
          #{info.$id} - {date as string}
        </span>
      </div>
      <div className="space-y-6 mt-6">
        <div className="flex-1 space-y-5">
          <div className="w-full p-3 border border-gray-200 rounded-xl">
            <h2 className="text-lg lg:text-xl font-medium">Products</h2>
            <CustomTable columns={orderDetails} data={tableData || []} />
          </div>
        </div>
        <div className="w-full space-y-5">
          <div className="w-full p-3 border border-gray-200 rounded-xl">
            <h2 className="text-lg lg:text-xl font-medium">Payment</h2>
            <div className="flex-between mt-4">
              <p className="text-dark-200">Subtotal</p>
              <p className="text-dark-200">{total}</p>
            </div>
            <div className="flex-between">
              <p className="text-dark-200">Discount</p>
              <p className="text-dark-200">0.00</p>
            </div>
            <div className="flex-between mt-5">
              <p className="text-dark-300 font-bold">Total</p>
              <p className="text-dark-300 font-bold">{total}</p>
            </div>
          </div>

          <div className="w-full p-3 border border-gray-200 rounded-xl">
            <h2 className="text-lg lg:text-xl font-medium">Customer</h2>
            <p className="text-sm font-light text-pretty mt-4">
              {info.creator.fullname}
            </p>
            <Link
              href={`mailto:${info.creator.email}`}
              className="text-sm text-blue-600 underline"
            >
              {info.creator.email}
            </Link>
            <p className="text-sm font-light text-pretty">
              {info.creator.phone}
            </p>

            <h3 className="text-xs text-dark-300 font-medium mt-3">
              Delivery address
            </h3>
            <p>
              {info.creator.address}, {info.creator.location}
            </p>
          </div>
        </div>
      </div>

      {info.status === "COMPLETED" ? (
        <div className="mt-6 w-full flex-center border border-gray-200 p-1">
          <span className="text-base font-light text-dark-200">
            Transaction completed.
          </span>
        </div>
      ) : info.status === "CANCELLED" ? (
        <div className="mt-6 p-1 w-full flex-center border border-red-100">
          <span className="text-base font-light text-red-100">
            Transaction cancelled.
          </span>
        </div>
      ) : (
        <Button
          type="button"
          disabled={loading}
          onClick={handleClick}
          className="w-full mt-8 bg-primary text-foreground"
        >
          {loading && (
            <Loader2Icon size={24} className="text-foreground animate-spin" />
          )}
          Mark as Completed
        </Button>
      )}
    </article>
  );
};

export default AdminTransactionView;
