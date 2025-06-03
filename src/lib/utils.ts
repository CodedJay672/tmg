import { clsx, type ClassValue } from "clsx";
import { Models } from "node-appwrite";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTitle = (title?: string) => {
  if (!title) return;

  const response = title.split("-").join(" ");
  return response;
};

export const formatDate = (iso: string) => {
  const date = new Date(iso);

  if (!date) return console.log("invalid date format");

  const option: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat("en-US", option);
  return formatter.format(date);
};

export const formatCurrency = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};

export const getTableData = (data?: Models.Document) => {
  if (!data) return;

  let result: TableTypeProps[] = [];

  data.order.products.forEach((product: Models.Document, idx: number) => {
    const res = {
      product,
      qty: data.order?.qty?.[idx],
      location: data.delivery_location,
    };

    result.push(res);
  });

  return result;
};

export const calculateInterest = (charge: number, price: number) => {
  const percentIncrease = Math.floor((charge * price) / 100);

  return percentIncrease;
};

export const downloadToMachine = (file: ArrayBuffer) => {
  const blob = new Blob([file]);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "datasheet.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};
