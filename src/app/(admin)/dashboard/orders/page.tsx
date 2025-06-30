import CustomTab from "@/components/shared/CustomTab";
import OrdersTable from "@/components/shared/table/orders/OrdersTable";
import { Calendar1Icon } from "lucide-react";
import React from "react";

const Orders = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;

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

      <div className="flex items-center gap-1 lg:gap-3">
        <CustomTab name="status" title="all" />
        <CustomTab name="status" title="processing" />
        <CustomTab name="status" title="cancelled" />
        <CustomTab name="status" title="completed" />
      </div>

      <div className="w-full z-0 overflow-hidden mt-5">
        <OrdersTable query={query} />
      </div>
    </section>
  );
};

export default Orders;
