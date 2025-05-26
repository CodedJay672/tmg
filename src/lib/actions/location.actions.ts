"use server";

import { Query } from "node-appwrite";
import { createAdminClient } from "../server/appwrite";
import { config } from "../server/config";
import { revalidatePath } from "next/cache";

export const getAllLocations = async (query?: string) => {
  try {
    const { database } = await createAdminClient();

    const locations = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.locationCollection,
      query ? [Query.equal("location", query)] : []
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
  } catch (error: any) {
    return {
      status: false,
      message: error.message,
    };
  }
};

export const updateLocation = async (charge: number, id?: string) => {
  try {
    const { database } = await createAdminClient();

    //confirm that the location exists
    if (!id)
      return {
        status: false,
        message: "Location not found.",
      };

    const response = await database.updateDocument(
      config.appwrite.databaseId,
      config.appwrite.locationCollection,
      id,
      {
        charge,
      }
    );

    if (!response)
      return {
        status: false,
        message: "Failed to update the location charges",
      };

    revalidatePath("/dashboard/settings", "page");
    return {
      status: true,
      message: "Charge updated for location.",
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.message,
    };
  }
};
