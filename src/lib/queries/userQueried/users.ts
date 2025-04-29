"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKey";
import { getUser, updateUserInfo } from "@/lib/actions/user.actions";

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, { id }],
    queryFn: () => getUser(id),
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        location: string;
        address: string;
      };
    }) => updateUserInfo(data, undefined, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.UPDATE_USER_INFO],
      });
    },
  });
};
