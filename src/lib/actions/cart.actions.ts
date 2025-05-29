"use server";

import { ID, Models, Query } from "node-appwrite";
import { createAdminClient } from "../server/appwrite";
import { config } from "../server/config";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { getAllLocations } from "./location.actions";

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

export const getUserCart = cache(async (id?: string) => {
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
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error?.message,
    };
  }
});

export const completeTransaction = async (
  transaction: TransactionEntryType
) => {
  try {
    const { database } = await createAdminClient();

    if (!transaction) return;

    const response = await saveCart(transaction.order);

    if (!response.status)
      return {
        status: false,
        message: response.message,
      };

    const delivery = await getAllLocations(transaction.delivery_location);

    if (!delivery.status)
      return {
        status: false,
        message: delivery.message,
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
        delivery_location: delivery.data?.documents?.[0].$id,
        delivery_address: transaction.delivery_address,
        receiver_name: transaction.receiver_name,
        receiver_phone: transaction.receiver_phone,
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

export const saveCart = async (order: TCart[]) => {
  try {
    const { database } = await createAdminClient();

    const response = await database.createDocument(
      config.appwrite.databaseId,
      config.appwrite.cartCollection,
      ID.unique(),
      {
        products: order.map((item) => item.id),
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
      query
        ? [
            Query.or([
              Query.equal("creator", query),
              Query.equal("order", query),
              Query.equal("status", query.toUpperCase()),
            ]),
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
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
});

export const updateTransactionStatus = async (data: {
  id: string;
  status: "CANCELLED" | "PROCESSING" | "COMPLETED";
}) => {
  try {
    const { database } = await createAdminClient();

    const res = await database.updateDocument(
      config.appwrite.databaseId,
      config.appwrite.transactionsCollection,
      data.id,
      {
        status: data.status,
      }
    );

    if (!res) {
      return {
        status: false,
        message: "Failed to update.",
      };
    }

    revalidatePath("/dashboard/orders", "page");

    return {
      status: true,
      message: "Updated successfully.",
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};
