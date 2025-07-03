import ProductForm from "@/components/ProductForm";
import { getProductById } from "@/lib/data/products/products.data";
import Image from "next/image";
import React from "react";

const CreateProducts = async ({
  searchParams,
}: {
  searchParams: Promise<{ productId: string }>;
}) => {
  const { productId } = await searchParams;
  const product = await getProductById(productId);

  return (
    <section className="dashboard-container flex flex-col">
      <div className="w-full max-w-lg py-10">
        <Image
          src="/assets/logo.png"
          alt="tmg procurement"
          width={140}
          height={32}
          className="rounded-full mx-auto"
        />
        <h2 className="text-lg lg:text-xl text-center font-medium">
          Add Products
        </h2>
        <p className="text-sm lg:text-base text-center text-dark-300">
          Please enter the products details
        </p>
        <ProductForm
          type={product?.data?.total ? "UPDATE" : "CREATE"}
          product={product?.data?.documents?.[0]}
        />
      </div>
    </section>
  );
};

export default CreateProducts;
