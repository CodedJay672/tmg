import OrdersTable from "@/components/shared/table/orders/OrdersTable";
import { Calendar1Icon } from "lucide-react";
import React from "react";

const Orders = () => {
  return (
    <section className="dashboard-container">
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

      <div className="w-full z-0">
        <h2 className="text-base lg:text-lg font-semibold">
          Recent transactions
        </h2>
        <OrdersTable />
      </div>
    </section>
  );
};

export default Orders;
