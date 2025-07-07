import "server-only";

import { createAdminClient } from "@/lib/server/appwrite";
import { config } from "@/lib/server/config";
import { Query } from "node-appwrite";
import { getLoggedInUser } from "../user/getLoggedInUser";
import { cache } from "react";

export const getTransaction = async (id?: string) => {
  try {
    const { database } = await createAdminClient();
    await getLoggedInUser();

    const response = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.transactionsCollection,
      id ? [Query.equal("$id", id), Query.orderDesc("$createdAt")] : []
    );

    if (!response.total)
      return {
        status: false,
        message: "Unable to get transactions.",
      };

    return {
      status: true,
      message: "Transaction fetched successfully.",
      data: response,
    };
  } catch (error) {
    throw error;
  }
};

export const filterTransaction = cache(async (query?: string) => {
  try {
    const { database } = await createAdminClient();
    await getLoggedInUser();

    const response = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.transactionsCollection,
      query
        ? [
            Query.equal("status", query.toUpperCase()),
            Query.orderDesc("$createdAt"),
          ]
        : []
    );

    if (!response.total)
      return {
        status: false,
        message: "Unable to get transactions.",
      };

    return {
      status: true,
      message: "Transaction fetched successfully.",
      data: response,
    };
  } catch (error) {
    throw error;
  }
});

export const getUserCart = async (id?: string) => {
  try {
    const { database } = await createAdminClient();

    const response = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.cartCollection,
      id ? [Query.equal("$id", id)] : []
    );

    if (!response) {
      return {
        status: false,
        message: "Failed to retrieve cart.",
      };
    }

    return {
      status: true,
      message: "Carts fetched successfully.",
      data: response,
    };
  } catch (error) {
    throw error;
  }
};
