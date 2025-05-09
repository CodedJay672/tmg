import React from "react";
import CustomTable from "../CustomTable";
import { orderTable } from "../columns";
import { getTransaction } from "@/lib/actions/cart.actions";

const OrdersTable = async () => {
  const orders = await getTransaction();

  return (
    <CustomTable columns={orderTable} data={orders?.data?.documents ?? []} />
  );
};

export default OrdersTable;
