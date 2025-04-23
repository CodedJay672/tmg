import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTitle = (title?: string) => {
  if (!title) return;

  const response = title.split("-").join(" ");
  return response;
};
