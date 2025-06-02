import CartActionButton from "@/components/shared/CartActionButton";
import WatchlistButton from "@/components/shared/WatchlistButton";
import { getAllLocations } from "@/lib/actions/location.actions";
import { getAllProducts, getProductById } from "@/lib/actions/products.actions";
import { getUser } from "@/lib/actions/user.actions";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { calculateInterest } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const user = await getLoggedInUser();

  if (!user) redirect("/sign-in");

  const currentUser = await getUser(user.$id);
  const productInfo = await getProductById(id);
  const location = await getAllLocations(
    currentUser?.data?.documents?.[0].delivery_location
  );

  const interest = calculateInterest(
    location?.data?.documents?.[0].charge,
    productInfo?.data?.documents?.[0].price
  );

  const total = productInfo?.data?.documents?.[0].price + interest;

  if (!productInfo?.status) return notFound();
  return (
    <section className="content-wrapper">
      <div className="w-full py-6 flex items-center gap-3">
        <Link href="/" className="text-base font-nomal text-dark-200">
          Home
        </Link>{" "}
        <span className="text-base font-nomal text-dark-200"> &lt; </span>
        <span className="text-base font-medium text-dark-300 uppercase">
          {productInfo.data?.documents?.[0].name}
        </span>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-24">
        <div className="w-full">
          <Image
            src={productInfo?.data?.documents?.[0].imgUrl}
            alt={productInfo.data?.documents?.[0].name}
            width={800}
            height={560}
            className="object-contain rounded-t-xl"
          />
        </div>
        <div className="w-full space-y-3">
          <div className="w-max px-16 py-4 bg-dark-100  rounded-4xl flex items-center gap-6">
            <WatchlistButton
              userId={user.$id}
              productId={productInfo.data?.documents?.[0].$id!}
              label="Add to watchlist"
            />

            {currentUser.data?.documents?.[0].delivery_location && (
              <CartActionButton
                item={{
                  ...productInfo.data?.documents?.[0]!,
                  price: total,
                }}
              />
            )}
          </div>

          <div className="w-full p-6">
            <h1 className="text-3xl lg:text-5xl text-pretty font-semibold">
              {productInfo.data?.documents?.[0].name}
            </h1>
            <p className="text-xl lg:text-2xl font-medium text-dark-300 mt-3">
              {total.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
              })}
            </p>
          </div>

          <div className="w-full p-6">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="mt-2">
              {productInfo?.data?.documents?.[0].description ??
                "This product has not description"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
