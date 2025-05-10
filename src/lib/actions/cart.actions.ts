"use server";

import { ID, Models, Query } from "node-appwrite";
import { createAdminClient } from "../server/appwrite";
import { config } from "../server/config";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const addProductsToCart = async (
  userId: string,
  itemId: string,
  price: number
) => {
  try {
    const { database } = await createAdminClient();

    // check if product is already present in the cart
    const isPresent = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.cartCollection,
      [Query.equal("products", itemId)]
    );

    if (!isPresent) {
      // create the item if it is not present
      const response = await database.updateDocument(
        config.appwrite.databaseId,
        config.appwrite.cartCollection,
        ID.unique(),
        {
          users: userId,
          products: itemId,
          qty: 1,
          price,
        }
      );

      if (!response) {
        return {
          status: false,
          message: "Could not add products to cart.",
        };
      }

      return {
        status: true,
        message: "Added successfully.",
      };
    }

    //update the cartitem if it is added already
    await updateCartItem(isPresent.documents?.[0], price, "add");
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error?.message,
    };
  }
};

export const updateCartItem = async (
  item: Models.Document,
  price: number,
  action: string
) => {
  try {
    const { database } = await createAdminClient();

    const response = await database.updateDocument(
      config.appwrite.databaseId,
      config.appwrite.cartCollection,
      item.$id,
      {
        qty: action === "add" ? item.qty + 1 : item.qty - 1,
        price:
          action === "add" ? (item.qty + 1) * price : (item.qty - 1) * price,
      }
    );

    if (!response) {
      return {
        status: false,
        message: "Failed to increase quantity",
      };
    }

    return {
      status: true,
      message: "Quantity increased.",
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: "Failed to update item.",
    };
  }
};

export const getUserCart = async (userId?: string) => {
  try {
    const { database } = await createAdminClient();

    const response = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.cartCollection,
      userId ? [Query.equal("user", userId)] : []
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
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error?.message,
    };
  }
};

export const completeTransaction = async (
  transaction: TransactionEntryType
) => {
  try {
    const { database } = await createAdminClient();

    if (!transaction) return;

    const response = await saveCart(transaction.order, transaction.total);

    if (!response.status)
      return {
        status: false,
        message: response.message,
      };

    const res = await database.createDocument(
      config.appwrite.databaseId,
      config.appwrite.transactionsCollection,
      ID.unique(),
      {
        creator: transaction.userId,
        order: response.data?.$id,
        total: transaction.total,
        location: transaction.location,
      }
    );

    if (!res)
      return {
        status: false,
        message: "Transaction Failed.",
      };

    revalidatePath("/dashboard/orders");
    return {
      status: true,
      message: "Transaction completed.",
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};

export const saveCart = async (order: TCart[], total: number) => {
  try {
    const { database } = await createAdminClient();

    const response = await database.createDocument(
      config.appwrite.databaseId,
      config.appwrite.cartCollection,
      ID.unique(),
      {
        product: order.map((item) => item.id),
        total,
        qty: order.map((item) => item.qty),
      }
    );

    if (!response)
      return {
        status: false,
        message: "Failed to save cart.",
      };

    return {
      status: true,
      message: "Cart saved successfully.",
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

export const getTransaction = cache(async (query?: string) => {
  try {
    const { database } = await createAdminClient();

    const response = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.transactionsCollection,
      query ? [Query.equal("status", query)] : []
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
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
});
