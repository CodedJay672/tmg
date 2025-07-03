import "server-only";

import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { cache } from "react";
import { redirect } from "next/navigation";
import { Models, Query } from "node-appwrite";
import { config } from "@/lib/server/config";

export const getLoggedInUser = cache(async () => {
  const response = await createSessionClient();

  if (!response) redirect("/sign-in");

  const { account } = response;

  return await account.get();
});

export const getUser = cache(
  async (
    id?: string
  ): Promise<{
    status: boolean;
    message: string;
    data?: Models.DocumentList<Models.Document>;
  }> => {
    try {
      const { database } = await createAdminClient();

      const response = await database.listDocuments(
        config.appwrite.databaseId,
        config.appwrite.usersCollection,
        id ? [Query.equal("accountId", id)] : []
      );

      if (!response.total) {
        return { status: false, message: "User not found." };
      }

      return {
        status: true,
        message: "User fetched successfully.",
        data: response,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const getCurrentUser = cache(async () => {
  try {
    //verify the loggedin user and return userDetails
    const loggedInUser = await getLoggedInUser();
    const currentUser = await getUser(loggedInUser?.$id);

    return currentUser.data;
  } catch (error) {
    throw error;
  }
});
