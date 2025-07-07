"use server";

import { ID, Models, Query } from "node-appwrite";
import { createAdminClient } from "../server/appwrite";
import { config } from "../server/config";
import { revalidatePath } from "next/cache";
import { getAllLocations } from "../data/locations/locations.data";
import { Resend } from "resend";
import { TransactionEmail } from "@/email/boqTemplateEmail";
import { formatDate, getTableData } from "../utils";
import { ReactNode } from "react";
import { updateUserInfo } from "./user.actions";

//create client for resend
const resend = new Resend(config.resend);

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
  } catch (error) {
    throw error;
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
  } catch (error) {
    throw error;
  }
};

export const completeTransaction = async (
  transaction: TransactionEntryType
) => {
  try {
    const { database } = await createAdminClient();

    if (!transaction) return;

    // save the users order
    const response = await saveCart(transaction.order);

    if (!response.status)
      return {
        status: false,
        message: response.message,
      };

    //get the location and its related charge
    const delivery = await getAllLocations(transaction.delivery_location);

    if (!delivery.status)
      return {
        status: false,
        message: delivery.message,
      };

    // upload the transaction information
    const res = await database.createDocument(
      config.appwrite.databaseId,
      config.appwrite.transactionsCollection,
      ID.unique(),
      {
        creator: transaction.userId,
        order: response.data?.$id,
        subTotal: transaction.subtotal,
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

    //construct the email variables object
    const emailVariables = {
      transactionDetails: getTableData(res),
      vat: Math.ceil(res.subTotal * 0.075),
      date: formatDate(res.$createdAt),
      transactionId: res.$id,
      orderId: res.order?.$id,
      subTotal: res.subTotal,
      total: res.total,
      customer: {
        fullname: res.creator?.fullname,
        email: res.creator?.email,
        phone: res.creator.phone,
      },
      billing: {
        name: res.receiver_name,
        location: res.delivery_location?.location,
        charge: res.delivery_location?.charge,
        address: res.delivery_address,
        phone: res.receiver_phone,
      },
    };

    const { error } = await resend.emails.send({
      from: "TMG Procurement <info@info.tmgprocurement.com>",
      to: [res.creator.email],
      subject: "New transaction alert!",
      react: TransactionEmail(emailVariables) as ReactNode,
    });

    if (error) {
      //delete order and transaction
      await deleteCart(res.order.$id);
      await deleteTransaction(res.$id);

      return {
        status: false,
        message: "Failed to send transaction email.",
      };
    }

    revalidatePath("/dashboard/orders");

    //clear the delivery location when transaction completes
    updateUserInfo(
      {
        data: {
          delivery_location: "",
          delivery_address: "",
          receiver_name: "",
          receiver_phone: "",
        },
      },
      transaction.userId
    );
    return {
      status: true,
      message: "Transaction completed.",
    };
  } catch (error) {
    throw error;
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
        products: [...order.map((item) => item.id)],
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
  } catch (error) {
    throw error;
  }
};

export const deleteCart = async (id: string) => {
  try {
    const { database } = await createAdminClient();

    await database.deleteDocument(
      config.appwrite.databaseId,
      config.appwrite.cartCollection,
      id
    );

    return;
  } catch (error) {
    throw error;
  }
};

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
  } catch (error) {
    throw error;
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    const { database } = await createAdminClient();

    await database.deleteDocument(
      config.appwrite.databaseId,
      config.appwrite.transactionsCollection,
      id
    );

    return true;
  } catch (error) {
    throw error;
  }
};
