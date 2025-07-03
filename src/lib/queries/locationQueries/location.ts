"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKey";
import { updateLocation } from "@/lib/actions/location.actions";

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, charge }: { id?: string; charge: number }) =>
      updateLocation(charge, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_LOCATIONS],
      });
    },
  });
};
