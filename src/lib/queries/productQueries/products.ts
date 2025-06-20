import { TProductDetails } from "@/constants/validations/schema";
import {
  deleteProduct,
  getAllProducts,
  getAllProductsMobile,
  getProductFromWatchlist,
  getUserWatchlist,
  updateWatchlist,
  uploadProducts,
} from "@/lib/actions/products.actions";
import {
  keepPreviousData,
  useInfiniteQuery,
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
    mutationFn: ({
      id,
      fileId,
      datasheetId,
    }: {
      id: string;
      fileId: string;
      datasheetId?: string;
    }) => deleteProduct(id, fileId, datasheetId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
      });
    },
  });
};

export const useGetProducts = (
  enabled: boolean,
  query?: string,
  page = "0"
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS, query, page],
    queryFn: () => getAllProducts(+page, query),
    enabled: enabled ? !!query : !enabled,
    placeholderData: keepPreviousData,
  });
};

export const useGetProductsInfinite = (query?: string) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS, query],
    queryFn: ({ pageParam }) => getAllProductsMobile(pageParam, query),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      const documents = lastPage?.data?.documents;
      const total = lastPage?.data?.total;

      if (!documents || !Array.isArray(documents) || documents.length === 0)
        return null;
      if (!total || total === 0) return null;

      const lastPageId = documents[documents.length - 1]?.$id;
      return lastPageId || null;
    },
  });
};

export const useGetLikedProducts = (productId: string, userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.WATCHLIST, productId, userId],
    queryFn: () => getProductFromWatchlist(productId, userId),
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
        queryKey: [QUERY_KEYS.WATCHLIST, variables.productId, variables.userId],
      });
    },
  });
};

export const useGetUserWatchlist = (userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_WATCHLIST, { userId }],
    queryFn: () => getUserWatchlist(userId),
  });
};
