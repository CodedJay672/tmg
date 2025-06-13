"use server";

import { productSchema, TProductDetails } from "@/constants/validations/schema";
import { createAdminClient } from "../server/appwrite";
import { config } from "../server/config";
import { ID, Models, Query } from "node-appwrite";
import { createFile, deleteFile, getFilePreview } from "./user.actions";
import { revalidatePath } from "next/cache";
import { cache } from "react";

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
  } catch (error: any) {
    return {
      status: false,
      message: error.message,
    };
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
  } catch (error: any) {
    return {
      status: false,
      message: error.message,
    };
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
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};

export const getAllProducts = cache(async (page?: number, query?: string) => {
  const DOCUMENT_PER_PAGE = 2;

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
});

//for mobile fetching
export const getAllProductsMobile = cache(
  async (pageParams?: string, query?: string) => {
    try {
      const { database } = await createAdminClient();
      const queryVals: any[] = [];

      if (pageParams) queryVals.push(Query.cursorAfter(pageParams));

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
  }
);

export const getProductById = cache(async (id?: string) => {
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
});

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

      revalidatePath("(root)/", "page");
      return true;
    }

    const productAdded = await addProductToWatchlist({ userId, productId });
    if (!productAdded) return false;

    revalidatePath("(root)/", "page");
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
  } catch (error: any) {
    throw error;
  }
};

export const getProductFromWatchlist = cache(
  async (productId: string, userId?: string) => {
    try {
      const { database } = await createAdminClient();

      const likedProduct = await database.listDocuments(
        config.appwrite.databaseId,
        config.appwrite.watchlistCollection,
        [
          userId
            ? Query.and([
                Query.equal("userId", userId),
                Query.equal("productId", productId),
              ])
            : Query.equal("productId", productId),
        ]
      );

      if (!likedProduct.total) return false;

      return likedProduct;
    } catch (error: any) {
      throw error;
    }
  }
);

export const getUserWatchlist = cache(async (userId: string) => {
  try {
    const { database } = await createAdminClient();

    const res = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.watchlistCollection,
      [Query.equal("userId", userId)]
    );

    if (!res.total) return false;

    return res;
  } catch (error) {
    throw error;
  }
});

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
