"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKey";
import { updateUserInfo } from "@/lib/actions/user.actions";
import { TUserDetails } from "@/constants/validations/schema";

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
