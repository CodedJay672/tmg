"use client";

import GlobalContext from "@/context/GlobalContext";
import React, { useContext } from "react";
import ProductGallery from "./ProductGallery";

const MobileProductsGallery = () => {
  const { category } = useContext(GlobalContext);

  return <ProductGallery query={category === "all" ? "" : category} enabled />;
};

export default MobileProductsGallery;
