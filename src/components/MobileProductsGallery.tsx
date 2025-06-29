import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllProducts } from "@/lib/actions/products.actions";
import InfiniteProducts from "./InfiniteProducts";
import { getUser } from "@/lib/actions/user.actions";

const MobileProductsGallery = async ({
  userId,
}: {
  userId: string | undefined;
}) => {
  const currentUser = await getUser(userId);
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) =>
      getAllProducts(typeof pageParam === "number" ? pageParam : 0),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InfiniteProducts user={currentUser.data?.documents?.[0]} />
    </HydrationBoundary>
  );
};

export default MobileProductsGallery;
