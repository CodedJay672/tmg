"use client";

import React, { useRef, useState } from "react";
import SubmitButton from "./shared/SubmitButton";
import CustomInput from "./shared/CustomInput";
import FileUploader from "./shared/FileUploader";
import { UploadCloudIcon } from "lucide-react";
import Image from "next/image";
import { useUploadProduct } from "@/lib/queries/productQueries/products";
import { toast } from "sonner";
import { Models } from "node-appwrite";

interface ProductFormProps {
  type: string;
  product: Models.Document | undefined;
}

const ProductForm = ({ type, product }: ProductFormProps) => {
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product?.price ?? "");
  const [error, setError] = useState<Record<string, string[]> | null>(null);
  const [imgUrl, setImgUrl] = useState(product?.imgUrl ?? "");
  const [category, setCategory] = useState<
    "mechanical" | "steel" | "electrical"
  >(product?.category ?? "mechanical");
  const [file, setFile] = useState<File[] | null>(null);
  const { mutateAsync: uploadProduct, isPending: loading } = useUploadProduct();

  const uploadRef = useRef<HTMLInputElement | null>(null);

  const filePicker = () => {
    if (!uploadRef.current) return;

    uploadRef.current.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ensure a file is selected
    if (!file || file.length === 0) {
      setError({ file: ["Product image is required."] });
      return;
    }

    if (type === "CREATE") {
      const response = await uploadProduct({
        name,
        price: parseInt(price),
        file: file[0],
        category,
      });

      if (!response.status) {
        if (response.data) {
          setError(response.data);
        }
        return toast.error(response.message);
      }
      toast.success(response.message);
    }

    setName("");
    setPrice("");
    setError(null);
    setImgUrl("");
    setCategory("mechanical");
    setFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full my-10 lg:my-6 flex-center flex-col gap-4"
    >
      <CustomInput
        label="Product name"
        type="text"
        name="name"
        value={name}
        onChange={setName}
        error={error?.["name"]}
      />

      <CustomInput
        label="Product price"
        type="number"
        name="price"
        value={price}
        onChange={setPrice}
        error={error?.["price"]}
      />

      <label htmlFor="category" className="w-full ">
        Product category
        <select
          id="category"
          defaultValue={category}
          onChange={(e) =>
            setCategory(e.target.value as "mechanical" | "steel" | "electrical")
          }
          className="w-full border border-secondary p-3 rounded-md mt-3"
        >
          <option value="mechanical">Mechanical</option>
          <option value="steel">Steel</option>
          <option value="electrical">Electrical</option>
        </select>
      </label>

      <div
        onClick={filePicker}
        className="w-full flex-center flex-col p-4 border border-secondary hover:bg-dark-100 transition-all my-6 rounded-lg"
      >
        {imgUrl ? (
          <>
            <Image src={imgUrl} alt="product image" width={200} height={100} />
            <p className="text-sm lg:text-base text-dark-200">
              Drop or click to change image.
            </p>
          </>
        ) : (
          <>
            <UploadCloudIcon size={24} className="text-dark-300" />
            <p className="text-sm lg:text-base text-dark-200">
              Drop images here or click to upload.
            </p>
          </>
        )}
        <div className="hidden">
          <FileUploader
            setImgUrl={setImgUrl}
            onChange={setFile}
            ref={uploadRef}
          />
        </div>
      </div>
      {error && "file" in error && (
        <p className="text-sm text-red-500">{error["file"]}</p>
      )}

      <SubmitButton label="Add product" />
    </form>
  );
};

export default ProductForm;
