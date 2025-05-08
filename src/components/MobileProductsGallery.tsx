"use client";

import GlobalContext from "@/context/GlobalContext";
import React, { useContext } from "react";
import ProductGallery from "./ProductGallery";

const MobileProductsGallery = ({ userId }: { userId: string | undefined }) => {
  const { category } = useContext(GlobalContext);

  return (
    <ProductGallery
      userId={userId}
      query={category === "all" ? "" : category}
      enabled
    />
  );
};

export default MobileProductsGallery;
