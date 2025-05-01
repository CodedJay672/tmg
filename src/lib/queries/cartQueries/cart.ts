"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKey";
import { getUserCart } from "@/lib/actions/cart.actions";

export const useGetCartById = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CART],
    queryFn: () => getUserCart,
  });
};
