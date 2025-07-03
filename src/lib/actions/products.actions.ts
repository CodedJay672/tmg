"use server";

import { productSchema, TProductDetails } from "@/constants/validations/schema";
import { createAdminClient } from "../server/appwrite";
import { config } from "../server/config";
import { ID, Models, Query } from "node-appwrite";
import { createFile, deleteFile } from "./user.actions";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { getProductFromWatchlist } from "../data/products/products.data";
import { getFilePreview } from "../data/utils";

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

    const datasheetUpload = await createFile(values.datasheet);

    // get file preview
    const imgUrl = await getFilePreview(imgUpload?.data);

    //get datasheet preview
    const datasheetUrl = await getFilePreview(datasheetUpload?.data);

    const res = await database.createDocument(
      config.appwrite.databaseId,
      config.appwrite.productCollection,
      ID.unique(),
      {
        name: values.name,
        price: values.price,
        category: values.category,
        imgUrl,
        imgId: imgUpload?.data?.$id,
        datasheetUrl,
        datasheetId: datasheetUpload?.data?.$id,
        description: values.description,
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
  } catch (error) {
    throw error;
  }
};

export const updateProducts = async (
  values: TProductDetails,
  product: Models.Document
) => {
  try {
    const { database } = await createAdminClient();
    let imgUpload,
      datasheetUpload = null;
    let imgUrl = product?.imgUrl;
    let datasheetUrl = product?.datasheetUrl;

    // check the data coming in to ensure it is in the right format
    const parsedData = productSchema.safeParse(values);

    if (!parsedData.success) {
      return {
        status: false,
        message: "Please check your entries.",
        data: parsedData.error.flatten().fieldErrors,
      };
    }

    if (values.file) {
      // upload the product image and get the preview url
      imgUpload = await createFile(values.file);
      imgUrl = await getFilePreview(imgUpload?.data);
    }

    if (values.datasheet) {
      datasheetUpload = await createFile(values.datasheet);
      datasheetUrl = await getFilePreview(datasheetUpload?.data);
    }

    const res = await database.updateDocument(
      config.appwrite.databaseId,
      config.appwrite.productCollection,
      product?.$id,
      {
        name: values.name,
        price: values.price,
        category: values.category,
        imgUrl,
        datasheetUrl,
        description: values.description,
      }
    );

    if (!res) {
      return {
        status: false,
        message: "Failed to upload product.",
      };
    }

    revalidatePath("/dashboard/products");
    return {
      status: true,
      message: "Product uploaded successfully.",
    };
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (
  productId: string,
  fileId: string,
  datasheetId?: string
) => {
  try {
    const { database } = await createAdminClient();

    //delete the datasheetId if it is present
    if (datasheetId) await deleteFile(datasheetId);

    //delete the product image from storage
    await deleteFile(fileId);

    //delete the product from all watchlist
    const watchlist = await getProductFromWatchlist(productId);

    if (watchlist) {
      for (const item of watchlist.documents) {
        await deleteProductFromWatchlist(item.$id);
      }
    }

    //delete the product
    await database.deleteDocument(
      config.appwrite.databaseId,
      config.appwrite.productCollection,
      productId
    );

    revalidatePath("/(admin)/dashboard/products");

    //return
    return {
      status: true,
      message: "Product removed successfully.",
    };
  } catch (error) {
    throw error;
  }
};

export const updateWatchlist = async (productId: string, userId?: string) => {
  try {
    const { database } = await createAdminClient();

    if (!userId) return false;

    const res = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.watchlistCollection,
      [
        Query.and([
          Query.equal("productId", productId),
          Query.equal("userId", userId),
        ]),
      ]
    );

    if (res.total) {
      const removeProduct = await removeProductFromWatchlist(
        res.documents?.[0].$id
      );

      if (!removeProduct) return false;

      revalidatePath("/", "page");
      revalidatePath(`/details/${productId}`);

      return true;
    }

    const productAdded = await addProductToWatchlist({ userId, productId });
    if (!productAdded) return false;

    revalidatePath("(root)/");
    revalidatePath(`(root)/(profile)/watchlist/${userId}`);
    revalidatePath(`(root)/details/${productId}`);
    return true;
  } catch (error) {
    throw error;
  }
};

export const removeProductFromWatchlist = async (id: string) => {
  try {
    const { database } = await createAdminClient();

    await database.deleteDocument(
      config.appwrite.databaseId,
      config.appwrite.watchlistCollection,
      id
    );

    return true;
  } catch (error) {
    throw error;
  }
};

export const addProductToWatchlist = async (data: {
  userId: string;
  productId: string;
}) => {
  try {
    const { database } = await createAdminClient();

    const response = await database.createDocument(
      config.appwrite.databaseId,
      config.appwrite.watchlistCollection,
      ID.unique(),
      {
        userId: data.userId,
        productId: data.productId,
      }
    );

    if (!response) return false;

    return true;
  } catch (error) {
    throw error;
  }
};

export const deleteProductFromWatchlist = async (productId: string) => {
  try {
    const { database } = await createAdminClient();

    await database.deleteDocument(
      config.appwrite.databaseId,
      config.appwrite.watchlistCollection,
      productId
    );

    return true;
  } catch (error) {
    throw error;
  }
};
