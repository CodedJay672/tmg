import React from "react";
import CustomTab from "@/components/shared/CustomTab";
import OrdersTable from "@/components/shared/table/orders/OrdersTable";
import { getTransaction } from "@/lib/data/transactions/transactions.data";
import { Calendar1Icon } from "lucide-react";

const Orders = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;
  const orders = await getTransaction();

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
        <CustomTab name="status" title="all" />
        <CustomTab name="status" title="processing" />
        <CustomTab name="status" title="cancelled" />
        <CustomTab name="status" title="completed" />
      </div>

      {query && (
        <p className="text-base font-medium mt-10">
          Search result for: <span className="text-primary">{query}</span>
        </p>
      )}

      <OrdersTable orders={orders.data?.documents} />
    </section>
  );
};

export default Orders;
