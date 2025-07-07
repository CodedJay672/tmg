import React, { Suspense } from "react";
import CustomTab from "@/components/shared/CustomTab";
import OrdersTable from "@/components/shared/table/orders/OrdersTable";
import { filterTransaction } from "@/lib/data/transactions/transactions.data";
import { Calendar1Icon, LucideLoader2 } from "lucide-react";

const Orders = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;

  // format the query string
  const queryString = query ? (query === "all" ? "" : query) : "";

  //filter orders by the query String
  const orders = await filterTransaction(queryString);

  return (
    <section className="dashboard-container overflow-hidden">
      <div className="w-full flex-between mb-10">
        <h2 className="admin-title">Orders</h2>
        <div className="flex items-center space-x-3">
          <p className="py-1 px-5 flex items-center shadow-md rounded-lg">
            Today <Calendar1Icon size="16" className="ml-3 text-dark-300" />
          </p>
          <p className="py-1 px-5 flex items-center shadow-md rounded-lg">
            Export
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 lg:gap-3 mb-5">
        <CustomTab name="all" />
        <CustomTab name="processing" />
        <CustomTab name="completed" />
        <CustomTab name="cancelled" />
      </div>

      <Suspense
        fallback={
          <div className="w-full flex-center mt-10">
            <p className="flex-center gap-1">
              <LucideLoader2 size={24} className="text-primary animate-spin" />{" "}
              Loading...
            </p>
          </div>
        }
      >
        <OrdersTable orders={orders.data?.documents} />
      </Suspense>
    </section>
  );
};

export default Orders;
