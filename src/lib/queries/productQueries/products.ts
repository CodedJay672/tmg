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
        queryKey: ["products"],
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
    queryKey: ["products", query, page],
    queryFn: () => getAllProducts(+page, query),
    enabled: enabled ? !!query : !enabled,
    placeholderData: keepPreviousData,
  });
};

export const useGetProductsInfinite = (query?: string) => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => getAllProductsMobile(pageParam, query),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      const documents = lastPage?.data;
      const total = lastPage?.data?.length;

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
    queryKey: ["products", productId, userId],
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
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["watchlist", variables.productId, variables.productId],
      });
    },
  });
};

export const useGetUserWatchlist = (userId?: string) => {
  return useQuery({
    queryKey: ["watchlist", { userId }],
    queryFn: () => getUserWatchlist(userId),
  });
};
