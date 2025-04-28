import { TProductDetails } from "@/constants/validations/schema";
import { uploadProducts } from "@/lib/actions/products.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUploadProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TProductDetails) => uploadProducts(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllProducts"],
      });
    },
  });
};
