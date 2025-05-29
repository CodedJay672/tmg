import { TProductDetails } from "@/constants/validations/schema";
import {
  deleteProduct,
  getAllProducts,
  uploadProducts,
} from "@/lib/actions/products.actions";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
      });
    },
  });
};

export const useGetProducts = (enabled: boolean, query?: string, page = 0) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS, query, page],
    queryFn: () => getAllProducts(+page, query),
    enabled: enabled ? !!query : !enabled,
    placeholderData: keepPreviousData,
  });
};
