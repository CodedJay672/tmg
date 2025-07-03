import "server-only";

import { createAdminClient } from "@/lib/server/appwrite";
import { config } from "@/lib/server/config";
import { Query } from "node-appwrite";
import { cache } from "react";
import { getCurrentUser } from "../user/getLoggedInUser";

export const getUserWatchlist = cache(async (userId?: string) => {
  try {
    const { database } = await createAdminClient();

    // verify the user
    const user = await getCurrentUser();

    if (!user) throw new Error("Invalid user id.");

    const res = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.watchlistCollection,
      userId ? [Query.equal("userId", userId)] : []
    );

    return res;
  } catch (error) {
    throw error;
  }
});
