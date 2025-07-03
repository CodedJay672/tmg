import { TProductDetails } from "@/constants/validations/schema";
import {
  deleteProduct,
  updateWatchlist,
  uploadProducts,
} from "@/lib/actions/products.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUploadProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TProductDetails) => uploadProducts(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useUpdateWatchlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      userId,
    }: {
      productId: string;
      userId?: string;
    }) => updateWatchlist(productId, userId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["watchlist", variables.productId, variables.productId],
      });
    },
  });
};
