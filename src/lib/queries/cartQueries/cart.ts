"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKey";
import { updateTransactionStatus } from "@/lib/actions/cart.actions";

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
