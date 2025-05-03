import { TProductDetails } from "@/constants/validations/schema";
import { getAllProducts, uploadProducts } from "@/lib/actions/products.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKey";

export const useUploadProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TProductDetails) => uploadProducts(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
      });
    },
  });
};

export const useGetProducts = (enabled: boolean, query?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS, query],
    queryFn: () => getAllProducts(query),
    enabled: enabled ? enabled : !!query,
  });
};
