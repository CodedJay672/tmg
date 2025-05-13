"use client";

import { formatCurrency, formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Models } from "node-appwrite";
import ProductMiniCard from "../ProductMiniCard";
import Status from "../Status";

export const orderTable: ColumnDef<Models.Document>[] = [
  {
    accessorKey: "$id",
    header: "Trans. ID",
  },
  {
    accessorKey: "order",
    header: "Order ID",
    cell: ({ row }) => {
      const order: Models.Document = row.getValue("order");

      const { $id } = order;
      return $id;
    },
  },
  {
    accessorKey: "creator",
    header: "Customer",
    cell: ({ row }) => {
      const data: Models.Document = row.getValue("creator");

      const { fullname } = data;

      return fullname;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const total = row.getValue("total") as number;

      return formatCurrency(total);
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "$createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("$createdAt") as string;

      const format = formatDate(date);

      return format;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <span
          className={`text-sm text-foreground px-2 py-1 rounded-full block flex-center ${
            status === "PROCESSING"
              ? "bg-amber-300"
              : status === "CANCELLED"
              ? "bg-red-400"
              : "bg-primary "
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

export const smallTable: ColumnDef<Models.Document>[] = [
  {
    accessorKey: "$id",
    header: "Trans. ID",
  },
  {
    accessorKey: "creator",
    header: "Customer",
    cell: ({ row }) => {
      const data: Models.Document = row.getValue("creator");

      const { fullname } = data;

      return fullname;
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const total = row.getValue("total") as number;

      return formatCurrency(total);
    },
  },
];

export const orderDetails: ColumnDef<TableTypeProps>[] = [
  {
    accessorKey: "product",
    header: "Item",
    cell: ({ row }) => <ProductMiniCard order={row.getValue("product")} />,
  },
  {
    accessorKey: "qty",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const product = row.getValue("product") as Models.Document;

      return formatCurrency(product.price);
    },
  },
];
