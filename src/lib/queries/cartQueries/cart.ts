"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKey";
import {
  getTransaction,
  getUserCart,
  updateTransactionStatus,
} from "@/lib/actions/cart.actions";

export const useGetCartById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CART, id],
    queryFn: ({ queryKey }: { queryKey: string[] }) => getUserCart(queryKey[1]),
  });
};

export const useGetTransactions = (query: string) => {
  return useQuery({
    queryKey: ["get transaction", query],
    queryFn: ({ queryKey }: { queryKey: string[] }) =>
      getTransaction(queryKey[1]),
  });
};

export const useUpdateTransactionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      id: string;
      status: "CANCELLED" | "PROCESSING" | "COMPLETED";
    }) => updateTransactionStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.UPDATE_USER_INFO],
      });
    },
  });
};
