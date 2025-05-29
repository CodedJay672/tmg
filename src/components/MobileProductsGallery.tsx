"use client";

import ProductGallery from "./ProductGallery";
import { useStore } from "@/store/appStore";

const MobileProductsGallery = ({ userId }: { userId: string | undefined }) => {
  const { category } = useStore();

  return (
    <></>
    // <ProductGallery
    //   userId={userId}
    //   query={category === "all" ? "" : category}
    //   enabled={false}
    // />
  );
};

export default MobileProductsGallery;
