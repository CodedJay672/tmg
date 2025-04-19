"use server";

import { config } from "../server/config";
import { createAdminClient } from "../server/appwrite";
import { Models, Query } from "node-appwrite";

export const getCurrentUser = async (
  id: string
): Promise<{
  status: boolean;
  message: string;
  data?: Models.DocumentList<Models.Document>;
}> => {
  try {
    const { database } = await createAdminClient();

    if (!id) {
      return { status: false, message: "Sign in to view your profile." };
    }

    const response = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.usersCollection,
      [Query.equal("accountId", id)]
    );

    if (!response.total) return { status: false, message: "User not found." };

    return {
      status: true,
      message: "User details fetched successfully.",
      data: response,
    };
  } catch (error: any) {
    console.log(error);
    return { status: false, message: error.message };
  }
};
