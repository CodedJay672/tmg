"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKey";
import {
  getAllLocations,
  updateLocation,
} from "@/lib/actions/location.actions";

export const useGetAllLocations = (query?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_LOCATIONS],
    queryFn: () => getAllLocations(query),
  });
};

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
