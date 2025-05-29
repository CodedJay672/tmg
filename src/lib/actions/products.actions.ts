"use server";

import { productSchema, TProductDetails } from "@/constants/validations/schema";
import { createAdminClient } from "../server/appwrite";
import { config } from "../server/config";
import { ID, Query } from "node-appwrite";
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

export const deleteProduct = async (productId: string) => {
  try {
    const { database } = await createAdminClient();

    await database.deleteDocument(
      config.appwrite.databaseId,
      config.appwrite.productCollection,
      productId
    );

    //revalidate paths
    revalidatePath("/");
    revalidatePath("/dashboard/products");

    //return
    return {
      status: true,
      message: "Product removed successfully.",
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};

export const getAllProducts = async (
  page: number | undefined,
  query?: string
) => {
  const DOCUMENT_PER_PAGE = 1;

  try {
    const { database } = await createAdminClient();

    const response = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.productCollection,
      query
        ? [
            Query.or([
              Query.search("name", query.toLowerCase()),
              Query.search("category", query.toLowerCase()),
            ]),
            Query.limit(DOCUMENT_PER_PAGE),
            page ? Query.offset(page * DOCUMENT_PER_PAGE) : Query.offset(0),
          ]
        : [
            Query.limit(DOCUMENT_PER_PAGE),
            page ? Query.offset(page * DOCUMENT_PER_PAGE) : Query.offset(0),
          ]
    );

    if (!response.total) {
      return {
        status: false,
        message: "No products found.",
      };
    }

    return {
      status: true,
      message: "Products found.",
      data: response,
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};

//for mobile fetching
export const getAllProductsMobile = async (
  pageParams: string,
  query?: string
) => {
  try {
    const { database } = await createAdminClient();
    const queryVals: any[] = [];

    if (!pageParams) queryVals.push(Query.cursorAfter(pageParams));

    const response = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.productCollection,
      query
        ? [
            Query.or([
              Query.search("name", query.toLowerCase()),
              Query.search("category", query.toLowerCase()),
            ]),
            ...queryVals,
          ]
        : queryVals
    );

    if (!response.total) {
      return {
        status: false,
        message: "No products found.",
      };
    }

    return {
      status: true,
      message: "Products found.",
      data: response,
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};

export const getProductById = async (id?: string) => {
  try {
    const { database } = await createAdminClient();

    if (!id) return;

    const response = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.productCollection,
      [Query.equal("$id", id)]
    );

    if (!response.total)
      return {
        status: false,
        message: "Product not found.",
      };

    return {
      status: true,
      message: "Product fetched successfully.",
      data: response,
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error?.message,
    };
  }
};
