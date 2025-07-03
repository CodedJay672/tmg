import React from "react";

import OrderActionButton from "@/components/shared/OrderActionButton";
import Status from "@/components/shared/Status";
import { orderDetails } from "@/components/shared/table/columns";
import CustomTable from "@/components/shared/table/CustomTable";
import { Button } from "@/components/ui/button";
import { getTransaction } from "@/lib/data/transactions/transactions.data";
import { formatCurrency, formatDate, getTableData } from "@/lib/utils";
import Link from "next/link";
import Back from "@/components/shared/Back";

const OderDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const orderInfo = await getTransaction(id);

  // generate the order table data
  const tableData = getTableData(orderInfo.data?.documents?.[0]);
  const vat = Math.ceil(orderInfo.data?.documents?.[0].subTotal * 0.075);

  const date = formatDate(orderInfo.data?.documents?.[0].$createdAt || "");
  return (
    <section className="w-full space-y-6 lg:pt-10">
      <div className="flex items-center gap-2 lg:hidden border-b border-dark-200 pb-4">
        <Back />
        <span className="text-lg font-bold">Back</span>
      </div>
      <div className="w-full px-3 py-5 border flex flex-col md:flex-row gap-3 border-gray-200 rounded-xl space-y-3">
        <div className="hidden lg:flex justify-center items-center border rounded-xl border-dark-200">
          <Back />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-stretch-200% lg:text-xl font-medium">
              #{id}
            </h1>

            <Status status={orderInfo.data?.documents?.[0].status} />
          </div>
          <div className="w-full flex items-center">
            <span className="text-dark-200 text-xs lg:text-sm font-medium">
              Order / Order details / #{id} - {date as string}
            </span>
          </div>
        </div>
        {orderInfo.data?.documents?.[0].status === "PROCESSING" && (
          <OrderActionButton
            data={{
              id: orderInfo.data?.documents?.[0].$id as string,
              status: "CANCELLED",
              label: "cancel order",
            }}
          />
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-5">
          <div className="w-full p-3 border border-gray-200 rounded-xl">
            <h2 className="text-lg lg:text-xl font-medium">Products</h2>
            <CustomTable columns={orderDetails} data={tableData || []} />
          </div>
        </div>
        <div className="w-full lg:w-3xs space-y-5">
          <div className="w-full p-3 border border-gray-200 rounded-xl">
            <h2 className="text-lg lg:text-xl font-medium">Payment</h2>
            <div className="flex-between mt-4">
              <p className="text-dark-300">Subtotal</p>
              <p className="text-dark-300">
                {formatCurrency(orderInfo.data?.documents?.[0].subTotal)}
              </p>
            </div>
            <div className="flex-between">
              <p className="text-dark-300">VAT (7.5%)</p>
              <p className="text-dark-300">{formatCurrency(vat)}</p>
            </div>
            <div className="flex-between mt-5">
              <p className="text-dark-300 font-bold">Total</p>
              <p className="text-dark-300 font-bold">
                {formatCurrency(orderInfo.data?.documents?.[0].total)}
              </p>
            </div>

            {orderInfo.data?.documents?.[0].status !== "CANCELLED" && (
              <div className="w-full mt-10 flex-center">
                <Button
                  type="button"
                  variant="outline"
                  className="mx-auto text-primary border-primary font-bold bg-foreground"
                >
                  Download Invoice
                </Button>
              </div>
            )}
          </div>

          <div className="w-full p-3 border border-gray-200 rounded-xl">
            <h2 className="text-lg lg:text-xl font-medium">Customer</h2>
            <p className="text-base font-normal text-pretty mt-4">
              {orderInfo.data?.documents?.[0].creator.fullname}
            </p>
            <Link
              href={`mailto:${orderInfo.data?.documents?.[0].creator.email}`}
              className="text-base text-blue-600 underline"
            >
              {orderInfo.data?.documents?.[0].creator.email}
            </Link>
            <p className="text-base font-normal text-pretty">
              {orderInfo.data?.documents?.[0].creator.phone}
            </p>

            <h3 className="text-base text-dark-200 font-medium mt-6 mb-2">
              Delivery address
            </h3>
            <p>
              Address:{" "}
              <span className="text-sm text-dark-300 font-medium">
                {orderInfo.data?.documents?.[0].delivery_address || "--"}
              </span>
            </p>
            <p>
              Location:{" "}
              <span className="text-sm text-dark-300 font-medium">
                {orderInfo.data?.documents?.[0].delivery_location.location ||
                  "--"}
              </span>
            </p>
            <p>
              Name:{" "}
              <span className="text-sm text-dark-300 font-medium">
                {orderInfo.data?.documents?.[0].receiver_name || "--"}
              </span>
            </p>
            <p>
              Phone:{" "}
              <span className="text-sm text-dark-300 font-medium">
                {orderInfo.data?.documents?.[0].receiver_phone || "--"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OderDetails;
