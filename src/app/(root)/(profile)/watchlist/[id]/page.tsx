import React from "react";
import ProductCard from "@/components/shared/ProductCard";
import ProfileMenuSwitch from "@/components/shared/ProfileMenuSwitch";
import Segments from "@/components/shared/Segments";
import { getUser } from "@/lib/data/user/getLoggedInUser";
import { getUserWatchlist } from "@/lib/data/watchlist/watchlist.data";
import { getProductById } from "@/lib/data/products/products.data";
import { Models } from "node-appwrite";

const Watchlist = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let productInfo: Models.Document[] | undefined = [];

  const user = await getUser(id);
  const watchlistItems = await getUserWatchlist(user?.data?.documents?.[0].$id);

  for (const item of watchlistItems.documents) {
    const product = await getProductById(item.productId);

    if (!product?.status) throw new Error(product?.message);

    productInfo.push(product?.data as Models.Document);
  }

  return (
    <section className="w-full">
      <div className="w-full py-3 lg:py-10 hidden lg:flex items-center gap-1">
        <Segments title="Watchlist" />
      </div>
      <div className="w-full lg:py-3 py-2 flex justify-between items-center lg:justify-start mb-4">
        <div className="">
          <h2 className="text-lg font-bold">Watchlist</h2>
          <p className="hidden lg:block text-base text-dark-300">
            Manage your watchlist.
          </p>
        </div>
        <ProfileMenuSwitch />
      </div>

      {productInfo.length > 0 ? (
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 no-scrollbar">
          {productInfo?.map((product) => (
            <ProductCard
              key={product.$id}
              user={user?.data?.documents?.[0]}
              item={product}
            />
          ))}
        </div>
      ) : (
        <p className="text-base lg:text-lg font-semibold text-gray-300 text-center w-full">
          Add products to watch.
        </p>
      )}
    </section>
  );
};

export default Watchlist;
