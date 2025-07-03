import "server-only";

import { cache } from "react";
import { createAdminClient } from "@/lib/server/appwrite";
import { config } from "@/lib/server/config";
import { Query } from "node-appwrite";

export const getAllLocations = cache(async (query?: string) => {
  try {
    const { database } = await createAdminClient();

    const locations = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.locationCollection,
      query ? [Query.equal("location", query)] : [Query.limit(37)]
    );

    if (!locations.total)
      return {
        status: false,
        message: "Failed to get locations",
      };

    return {
      status: true,
      message: "Locations fetched successfully.",
      data: locations,
    };
  } catch (error) {
    throw error;
  }
});
