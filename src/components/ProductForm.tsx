"use client";

import React, { RefObject, useRef, useState } from "react";
import SubmitButton from "./shared/SubmitButton";
import CustomInput from "./shared/CustomInput";
import FileUploader from "./shared/FileUploader";
import { UploadCloudIcon } from "lucide-react";
import Image from "next/image";
import { useUploadProduct } from "@/lib/queries/productQueries/products";
import { toast } from "sonner";
import { AppwriteException, Models } from "node-appwrite";
import { cn } from "@/lib/utils";
import { updateProducts } from "@/lib/actions/products.actions";

interface ProductFormProps {
  type: string;
  product?: Models.Document;
}

const ProductForm = ({ type, product }: ProductFormProps) => {
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product?.price ?? "");
  const [error, setError] = useState<Record<string, string[]> | null>(null);
  const [imgUrl, setImgUrl] = useState(product?.imgUrl ?? "");
  const [datasheetUrl, setDatasheetUrl] = useState(product?.datasheetUrl ?? "");
  const [category, setCategory] = useState<
    "mechanical" | "steel" | "electrical"
  >(product?.category ?? "mechanical");
  const [description, setdescription] = useState(product?.description ?? "");
  const [file, setFile] = useState<File[] | null>(null);
  const [datasheet, setDatasheet] = useState<File[] | undefined>([]);
  const { mutateAsync: uploadProduct } = useUploadProduct();

  const uploadRef = useRef<HTMLInputElement | null>(null);
  const datasheetRef = useRef<HTMLInputElement | null>(null);

  const filePicker = (ref: RefObject<HTMLInputElement | null>) => {
    if (!ref.current) return;

    ref.current.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    let response = null;

    try {
      // ensure a file is selected
      if (!imgUrl || !file || file.length === 0) {
        setError({ file: ["Product image is required."] });
        return false;
      }

      if (type === "CREATE") {
        response = await uploadProduct({
          name,
          price: parseInt(price),
          file: file ? file[0] : undefined,
          datasheet: datasheet ? datasheet[0] : undefined,
          category,
          description,
        });
      } else {
        response = await updateProducts(
          {
            name,
            price: parseInt(price),
            file: file ? file[0] : undefined,
            datasheet: datasheet ? datasheet[0] : undefined,
            category,
            description,
          },
          product!
        );
      }

      if (!response.status) {
        if (response.data) {
          setError(response.data);
        }
        return toast.error(response.message);
      }

      toast.success(response.message);
      setName("");
      setPrice("");
      setError(null);
      setImgUrl("");
      setCategory("mechanical");
      setFile(null);
      setDatasheet(undefined);
      setdescription("");
    } catch (error) {
      if (error instanceof AppwriteException) toast.error(error.message);
      throw error;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full my-10 flex-center flex-col gap-4"
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
          className="w-full border border-secondary p-3 rounded-md mt-3 bg-white"
        >
          <option value="mechanical">Mechanical</option>
          <option value="steel">Steel</option>
          <option value="electrical">Electrical</option>
        </select>
      </label>

      <div
        onClick={() => filePicker(uploadRef)}
        className="w-full flex-center flex-col p-4 border border-secondary bg-white hover:bg-dark-100 transition-all my-6 rounded-lg"
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
        {error && "file" in error && (
          <p className="text-sm text-red-500">{error["file"]}</p>
        )}
      </div>

      <div
        onClick={() => filePicker(datasheetRef)}
        className="w-full flex-center flex-col p-4 border border-secondary bg-white hover:bg-dark-100 transition-all my-6 rounded-lg"
      >
        {datasheetUrl ? (
          <>
            <p className="text-base text-center text-dark-200">
              {datasheet?.values && "File uploaded successfully!"}
            </p>
            <p className="text-sm lg:text-base text-dark-200">
              Click to change the file.
            </p>
          </>
        ) : (
          <>
            <UploadCloudIcon size={24} className="text-dark-300" />
            <p className="text-sm lg:text-base text-dark-200">
              Upload product datasheet.
            </p>
          </>
        )}
        <div className="hidden">
          <FileUploader
            setImgUrl={setDatasheetUrl}
            onChange={setDatasheet}
            ref={datasheetRef}
          />
        </div>
        {error && "datasheet" in error && (
          <p className="text-sm text-red-500">{error["datasheet"]}</p>
        )}
      </div>

      <label htmlFor="description" className="w-full">
        Description
        <textarea
          rows={10}
          onChange={(e) => setdescription(e.target.value)}
          value={description}
          placeholder="Enter the product description here..."
          className={cn(
            "w-full border border-secondary rounded-md p-2 lg:py-3 mt-2 outline-none transition-all bg-white disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400",
            { "border-2 border-red-500": error?.["datasheet"] }
          )}
        />
      </label>

      <SubmitButton
        label={type === "CREATE" ? "Add product" : "Update product"}
      />
    </form>
  );
};

export default ProductForm;
