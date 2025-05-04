"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKey";
import { getUser, updateUserInfo } from "@/lib/actions/user.actions";
import { TUserDetails } from "@/constants/validations/schema";

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
      productId,
    }: {
      id: string;
      data: Partial<TUserDetails>;
      productId?: string;
    }) => updateUserInfo({ data, productId }, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.UPDATE_USER_INFO],
      });
    },
  });
};
