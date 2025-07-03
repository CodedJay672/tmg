import "server-only";

import { createAdminClient } from "@/lib/server/appwrite";
import { cache } from "react";
import { getCurrentUser } from "../user/getLoggedInUser";
import { config } from "@/lib/server/config";
import { Models, Query } from "node-appwrite";

export const getAllProducts = cache(async (page?: number, query?: string) => {
  const DOCUMENT_PER_PAGE = 25;

  try {
    const { database } = await createAdminClient();

    const currentUser = await getCurrentUser();

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

    const productsWithInfo = await Promise.all(
      response.documents.map(async (product) => {
        const liked = await getProductFromWatchlist(
          product?.$id,
          currentUser?.documents?.[0].$id
        );

        return {
          ...product,
          isLiked: !!liked,
        };
      })
    );

    return {
      status: true,
      message: "Products found.",
      data: productsWithInfo,
    };
  } catch (error) {
    throw error;
  }
});

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
    } catch (error) {
      throw error;
    }
  }
);

export const getProductById = cache(async (id?: string) => {
  try {
    const { database } = await createAdminClient();

    //verify authenticated user
    await getCurrentUser();
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

    const isLiked = await getProductFromWatchlist(response.documents?.[0].$id);

    return {
      status: true,
      message: "Product fetched successfully.",
      data: {
        ...(response.documents?.[0] as Models.Document),
        isLiked: !!isLiked,
      } as ProductDataType,
    };
  } catch (error) {
    throw error;
  }
});

//for mobile fetching
export const getAllProductsMobile = cache(
  async (pageParams?: string, query?: string) => {
    try {
      const { database } = await createAdminClient();
      const queryVals: string[] = [];

      const currentUser = await getCurrentUser();
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

      const productsWithInfo = await Promise.all(
        response.documents.map(async (product) => {
          const liked = await getProductFromWatchlist(
            product?.$id,
            currentUser?.documents?.[0].$id
          );

          return {
            ...product,
            isLiked: !!liked,
          };
        })
      );

      return {
        status: true,
        message: "Products found.",
        data: productsWithInfo,
      };
    } catch (error) {
      throw error;
    }
  }
);
