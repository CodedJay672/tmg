// "use client";

// import React from "react";
// import { useStore } from "@/store/appStore";
// // import { useGetProductsInfinite } from "@/lib/queries/productQueries/products";
// import ProductCard from "./shared/ProductCard";
// import { useGetUserById } from "@/lib/queries/userQueried/users";
// import { Loader2Icon } from "lucide-react";

// type MobileProductsGalleryProps = {
//   userId?: string;
// };

// const MobileProductsGallery: React.FC<MobileProductsGalleryProps> = ({
//   userId,
// }) => {
//   const { category } = useStore();
//   const { data: user } = useGetUserById(userId);
//   // const { data, isLoading, isError, error } = useGetProductsInfinite(
//   //   category === "all" ? "" : category
//   // );

//   //handle loading state
//   // if (isLoading)
//   //   return (
//   //     <div className="flex-center mt-5 col-span-2">
//   //       <p className="text-base flex gap-1">
//   //         <Loader2Icon size={20} className="text-primary animate-spin" />
//   //         Fetching products...
//   //       </p>
//   //     </div>
//   //   );

//   //handle errors
//   if (isError)
//     return (
//       <div className="flex-center mt-5 col-span-2">
//         <p className="text-base">Error: {error?.message}</p>
//       </div>
//     );

//   // Flatten the products from all pages
//   const products =
//     data?.pages?.flatMap((page) =>
//       page && "data" in page && Array.isArray(page.data) ? page.data : []
//     ) ?? [];

//   const userInfo = user?.data?.documents?.[0];

//   return products.length === 0 ? (
//     <p className="text-base text-gray-300 col-span-2 text-center">
//       No products found
//     </p>
//   ) : (
//     products.map((product) => <ProductCard user={userInfo} item={product} />)
//   );
// };

// export default MobileProductsGallery;
