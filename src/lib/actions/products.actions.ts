"use server";

import { productSchema, TProductDetails } from "@/constants/validations/schema";
import { createAdminClient } from "../server/appwrite";
import { config } from "../server/config";
import { ID } from "node-appwrite";
import { createFile, getFilePreview } from "./user.actions";
import { revalidatePath } from "next/cache";

export const uploadProducts = async (values: TProductDetails) => {
  try {
    const { database } = await createAdminClient();

    // check the data coming in to ensure it is in the right format
    const parsedData = productSchema.safeParse(values);

    if (!parsedData.success) {
      return {
        status: false,
        message: "Please check your entries.",
        data: parsedData.error.flatten().fieldErrors,
      };
    }

    // upload the product image and get the preview url
    const imgUpload = await createFile(values.file);

    // get file preview
    const imgUrl = await getFilePreview(imgUpload.data!);

    const res = await database.createDocument(
      config.appwrite.databaseId,
      config.appwrite.productCollection,
      ID.unique(),
      {
        name: values.name,
        price: values.price,
        category: values.category,
        imgUrl,
      }
    );

    if (!res) {
      return {
        status: false,
        message: "Failed to upload product.",
      };
    }

    revalidatePath("/");
    revalidatePath("/dashboard/products");
    return {
      status: true,
      message: "Product uploaded successfully.",
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};
