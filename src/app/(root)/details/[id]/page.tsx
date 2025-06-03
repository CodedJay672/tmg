import CartActionButton from "@/components/shared/CartActionButton";
import DownloadDatasheetButton from "@/components/shared/DownloadDatasheetButton";
import WatchlistButton from "@/components/shared/WatchlistButton";
import { getAllLocations } from "@/lib/actions/location.actions";
import { getAllProducts, getProductById } from "@/lib/actions/products.actions";
import { getUser } from "@/lib/actions/user.actions";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { calculateInterest } from "@/lib/utils";
import { StarHalfIcon, StarIcon } from "lucide-react";
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
      <div className="w-full py-6 px-4 lg:px-0 mb-6 flex items-center gap-3">
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
            className="object-contain rounded-t-xl mb-4"
          />

          <p className="text-base text-dark-200 font-medium p-2">
            Product: #{productInfo.data?.documents?.[0].$id}
          </p>
          <div className="px-2 flex items-center gap-10">
            <p className="text-lg lg:text-xl font-semibold">TMG Procurement</p>
            <p className="text-base font-semibold py-1 px-3 rounded-2xl text-center bg-dark-100">
              {productInfo?.data?.documents?.[0].category}
            </p>
          </div>

          <div className="w-full p-6 border border-gray-300 rounded-lg mt-6">
            <h2 className="text-lg lg:text-2xl font-semibold">
              Ratings & Reviews
            </h2>

            <div className="flex justify-between gap-6 lg:gap-10 mt-6 border-t border-gray-300 py-6">
              <div className="mt-4">
                <h2 className="text-5xl lg:text-7xl font-medium font-stretch-100% mb-1">
                  4.8
                </h2>
                <div className="flex items-center">
                  <StarIcon
                    size={20}
                    className="text-amber-300 fill-amber-300"
                  />
                  <StarIcon
                    size={20}
                    className="text-amber-300 fill-amber-300"
                  />
                  <StarIcon
                    size={20}
                    className="text-amber-300 fill-amber-300"
                  />
                  <StarHalfIcon
                    size={20}
                    className="text-amber-300 fill-amber-300"
                  />
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1 w-full">
                  <span className="text-sm font-medium">5</span>
                  <div className="w-42 lg:w-64 rounded-xl bg-gray-200">
                    <div className="w-5/6 p-1 rounded-xl bg-dark-300" />
                  </div>
                </div>
                <div className="flex items-center gap-1 w-full">
                  <span className="text-sm font-medium">4</span>
                  <div className="w-42 lg:w-64 rounded-xl bg-gray-200">
                    <div className="w-full p-1 rounded-xl bg-dark-300" />
                  </div>
                </div>
                <div className="flex items-center gap-1 w-full">
                  <span className="text-sm font-medium">3</span>
                  <div className="w-42 lg:w-64 rounded-xl bg-gray-200">
                    <div className="w-4/6 p-1 rounded-xl bg-dark-300" />
                  </div>
                </div>
                <div className="flex items-center gap-1 w-full">
                  <span className="text-sm font-medium">2</span>
                  <div className="w-42 lg:w-64 rounded-xl bg-gray-200">
                    <div className="w-3/6 p-1 rounded-xl bg-dark-300" />
                  </div>
                </div>
                <div className="flex items-center gap-1 w-full">
                  <span className="text-sm font-medium">1</span>
                  <div className="w-42 lg:w-64 rounded-xl bg-gray-200">
                    <div className="w-2/6 p-1 rounded-xl bg-dark-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full space-y-3">
          <div className="w-full lg:w-max px-16 py-4 bg-dark-100  rounded-4xl flex items-center gap-6">
            <WatchlistButton
              userId={user.$id}
              productId={productInfo.data?.documents?.[0].$id!}
              label="Add to watchlist"
            />
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

          <div className="mt-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
            {currentUser.data?.documents?.[0].delivery_location && (
              <CartActionButton
                item={{
                  ...productInfo.data?.documents?.[0]!,
                  price: total,
                }}
              />
            )}
            <DownloadDatasheetButton
              id={productInfo.data?.documents?.[0].datasheetId}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
