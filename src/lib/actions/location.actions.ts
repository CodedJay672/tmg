"use server";

import { getCurrentUser } from "../data/user/getLoggedInUser";
import { createAdminClient } from "../server/appwrite";
import { config } from "../server/config";
import { revalidatePath } from "next/cache";

export const updateLocation = async (charge: number, id?: string) => {
  try {
    const { database } = await createAdminClient();
    const user = await getCurrentUser();

    //confirm that the user exists
    if (!id || user?.documents?.[0].$id !== id)
      return {
        status: false,
        message: "Location not found.",
      };

    // charge should not be greater than 100 or less than 1
    if (charge < 1 || charge > 100)
      return {
        status: false,
        message: "Invalid charge percentage.",
      };

    const response = await database.updateDocument(
      config.appwrite.databaseId,
      config.appwrite.locationCollection,
      id,
      {
        charge,
        $updatedAt: new Date(),
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
  } catch (error) {
    throw error;
  }
};
