"use client";

import { formatCurrency, formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Models } from "node-appwrite";
import ProductMiniCard from "../ProductMiniCard";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon, MoreVerticalIcon } from "lucide-react";
import CustomSheet from "../CustomSheet";
import AdminTransactionView from "@/components/AdminTransactionView";
import React from "react";
import Image from "next/image";

export const orderTable: ColumnDef<Models.Document>[] = [
  {
    id: "s/n",
    header: "S/N",
    cell: ({ row, table }) => {
      return table.getSortedRowModel().flatRows.indexOf(row) + 1;
    },
  },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDownIcon size={16} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data: Models.Document = row.getValue("creator");

      const { fullname } = data;

      return fullname;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDownIcon size={16} />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-medium"
        >
          Date
          <ArrowUpDownIcon size={16} />
        </Button>
      );
    },
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
  {
    id: "action",
    cell: ({ row }) => {
      const [open, setOpen] = React.useState(false);

      return (
        <>
          <Button
            variant="ghost"
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <MoreVerticalIcon size={24} className="text-dark-300" />
          </Button>
          <CustomSheet open={open} onOpenChange={setOpen}>
            <AdminTransactionView info={row.original} />
          </CustomSheet>
        </>
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

export const customerTable: ColumnDef<Models.Document>[] = [
  {
    accessorKey: "s/n",
    header: "S/N",
    cell: ({ row, table }) => {
      return table.getSortedRowModel().flatRows.indexOf(row) + 1;
    },
  },
  {
    accessorKey: "imgUrl",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            return column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Customer <ArrowUpDownIcon size={16} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rowInfo = row.original;
      const { fullname, imgUrl } = rowInfo;

      return (
        <div className="flex items-center gap-2">
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={fullname}
              width={24}
              height={24}
              className="object-contain shrink-0 rounded-full"
            />
          ) : (
            <div className="size-8 p-1 rounded-full bg-primary flex-center border border-dark-200">
              <span className="text-base font-bold">{fullname[0]}</span>
            </div>
          )}
          <p className="text-base font-medium text-dark-300 line-clamp-1 truncate">
            {fullname}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            return column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Location <ArrowUpDownIcon size={16} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const location = row.getValue("location");

      return location ? location : "N/A";
    },
  },
  {
    accessorKey: "transactions",
    header: "Orders",
    cell: ({ row }) => {
      const transactions = row.getValue("transactions") as Models.Document[];

      return (
        <p className="text-dak-3">
          {transactions.length ? transactions.length : null}{" "}
          {transactions.length > 1
            ? "Orders"
            : transactions.length < 1
            ? "N/A"
            : "Order"}
        </p>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total spending",
    cell: ({ row }) => {
      const transactions = row.getValue("transactions") as Models.Document[];

      const total = transactions.reduce(
        (init, item) =>
          item.status === "COMPLETED" ? item.total + init : init,
        0
      );

      return (
        <p className="text-dark-300">
          {total > 0 ? formatCurrency(total) : "N/A"}
        </p>
      );
    },
  },
];
