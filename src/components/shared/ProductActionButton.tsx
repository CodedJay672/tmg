"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { deleteProduct } from "@/lib/actions/products.actions";
import { toast } from "sonner";
import { useDeleteProduct } from "@/lib/queries/productQueries/products";
import { Loader2Icon } from "lucide-react";

const ProductActionButton = ({ productId }: { productId: string }) => {
  const { mutateAsync: handleDeleteProduct, isPending: loading } =
    useDeleteProduct();

  return (
    <div className="flex-center p-6 gap-2">
      <Button
        type="button"
        variant="link"
        asChild
        className="hidden lg:block bg-secondary hover:bg-primary text-foreground"
      >
        <Link href={`/create-product/${productId}`}>Update</Link>
      </Button>
      <Button
        type="button"
        onClick={() => handleDeleteProduct(productId)}
        className="hidden lg:block text-foreground bg-red-300 hover:bg-red-500 cursor-pointer"
      >
        {loading ? (
          <Loader2Icon size={16} className="text-foreground animate-spin" />
        ) : (
          <>Delete</>
        )}
      </Button>
    </div>
  );
};

export default ProductActionButton;
