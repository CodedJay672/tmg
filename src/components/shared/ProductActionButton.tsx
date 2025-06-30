"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useDeleteProduct } from "@/lib/queries/productQueries/products";
import { Loader2Icon, MoreVerticalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const ProductActionButton = ({
  fileId,
  productId,
  datasheetId,
}: {
  fileId: string;
  productId: string;
  datasheetId?: string;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { mutateAsync: handleDeleteProduct, isPending: loading } =
    useDeleteProduct();
  const param = useSearchParams();

  const router = useRouter();

  const toggleMenu = () => {
    setShowDropdown((prev) => !prev);
  };

  const updateProduct = (id: string) => {
    //close the dropdown
    toggleMenu();

    //route to the createf-product form
    const productId = new URLSearchParams(param);

    const pathname = "/dashboard/create-products";

    if (!id) return null;

    productId.set("productId", id);
    router.push(`${pathname}?${productId.toString()}`);
  };

  return (
    <div className="flex-center lg:p-6 gap-2 relative">
      <Button
        type="button"
        variant="link"
        onClick={() => updateProduct(productId)}
        className="hidden lg:block bg-secondary/50 text-primary"
      >
        Update
      </Button>
      <Button
        type="button"
        variant="link"
        onClick={() =>
          handleDeleteProduct({ id: productId, fileId, datasheetId })
        }
        className="hidden lg:block text-red-500 bg-red-200 cursor-pointer"
      >
        {loading ? (
          <Loader2Icon size={16} className="text-foreground animate-spin" />
        ) : (
          <>Delete</>
        )}
      </Button>

      <div
        onClick={toggleMenu}
        className="w-full lg:hidden hover:bg-dark-100 p-2 transition-all rounded-md cursor-pointer"
      >
        <MoreVerticalIcon size={24} />
      </div>

      {/** Mobile action dropdown */}
      <div
        className={cn(
          "lg:hidden w-40 h-0 absolute top-10 right-0 bg-foreground py-6 px-3 space-y-2 rounded-lg shadow-md z-90 transition-all transform-gpu duration-300 overflow-hidden -translate-y-20 opacity-0",
          {
            "h-32 translate-y-1 opacity-100": showDropdown,
          }
        )}
      >
        <Button
          type="button"
          variant="ghost"
          onClick={() => updateProduct(productId)}
          className="w-full bg-secondary/50 text-primary"
        >
          Update
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => handleDeleteProduct({ id: productId, fileId })}
          className="w-full text-red-500 bg-red-200 cursor-pointer"
        >
          {loading ? (
            <Loader2Icon size={16} className="text-foreground animate-spin" />
          ) : (
            <>Delete</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductActionButton;
