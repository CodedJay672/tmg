"use server";

import { config } from "../server/config";
import { createAdminClient } from "../server/appwrite";
import { ID, Models, Query } from "node-appwrite";
import { TUserDetails, userDetails } from "@/constants/validations/schema";
import { revalidatePath } from "next/cache";
import { getAllLocations } from "../data/locations/locations.data";
import { getCurrentUser } from "../data/user/getLoggedInUser";
import { getFilePreview } from "../data/utils";

export const updateUserInfo = async (
  { data, productId }: { data: Partial<TUserDetails>; productId?: string },
  id?: string,
  file?: File
) => {
  try {
    const { database } = await createAdminClient();
    let filePrev, res, watchlist;

    console.log(id);
    // check for a valid id
    if (!id) {
      return {
        status: false,
        message: "Invalid user id.",
      };
    }

    //validate form data
    const parsedData = userDetails.safeParse({
      ...data,
    });

    if (!parsedData.success) {
      return {
        status: false,
        message: "Form contains errors.",
        data: parsedData.error.flatten().fieldErrors,
      };
    }

    if (file) {
      // upload the file and get filepreview
      res = await createFile(file);

      if (!res?.status) {
        return {
          status: false,
          message: res?.message,
        };
      }

      filePrev = await getFilePreview(res.data!);
    }

    // check for produts to add to watchlist
    if (productId) watchlist = await updateWatchlist(productId);

    //verify validity of location
    if (data.delivery_location) await getAllLocations(data.delivery_location);

    // update the users imgUrl
    const response = await database.updateDocument(
      config.appwrite.databaseId,
      config.appwrite.usersCollection,
      id,
      {
        ...data,
        $updatedAt: new Date(),
        imgUrl: filePrev,
        watchlist: watchlist ? [...watchlist] : watchlist,
      }
    );

    if (!response) {
      // delete file if it was uploaded
      if (file) await deleteFile(res?.data?.$id!);

      return {
        status: false,
        message: "Profile update failed.",
      };
    }

    // revalidate paths
    revalidatePath(`/`, "page");
    revalidatePath(`/user/${id}`, "page");
    revalidatePath("/cart", "page");

    return {
      status: true,
      message: "Profile updated.",
    };
  } catch (error) {
    throw error;
  }
};

export const createFile = async (file: File | undefined) => {
  try {
    const { storage } = await createAdminClient();

    if (!file) return;

    const response = await storage.createFile(
      config.appwrite.storageId,
      ID.unique(),
      file
    );

    if (!response) {
      return {
        status: false,
        message: "File upload failed",
      };
    }

    return {
      status: true,
      message: "File upoaded successfully.",
      data: response,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (id: string) => {
  try {
    const { storage } = await createAdminClient();

    await storage.deleteFile(config.appwrite.storageId, id);
  } catch (error) {
    throw error;
  }
};

export const downloadFile = async (id?: string) => {
  try {
    if (!id)
      return {
        status: false,
        message: "File does not exist",
      };

    const { storage } = await createAdminClient();

    const response = await storage.getFileDownload(
      config.appwrite.storageId,
      id
    );

    if (!response)
      return {
        status: false,
        message: "Failed to download file.",
      };

    return response;
  } catch (error) {
    throw error;
  }
};

//watchlist logic
const updateWatchlist = async (productId: string) => {
  try {
    const { database } = await createAdminClient();

    // get user watchlist
    const currentUser = await getCurrentUser();
    const watchlist = currentUser?.documents?.[0].watchlist;

    // get product details
    const productInfo = await database.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.productCollection,
      [Query.equal("$id", productId)]
    );
    if (!productInfo.total) {
      return {
        status: false,
        message: "Product not found.",
      };
    }

    const isAdded = watchlist.find(
      (item: Models.Document) => item.$id === productInfo.documents?.[0].$id
    );

    if (isAdded) {
      return watchlist.filter(
        (item: Models.Document) => item.$id !== productInfo.documents?.[0].$id
      );
    }

    return [{ ...productInfo.documents?.[0] }, ...watchlist];
  } catch (error) {
    throw error;
  }
};
