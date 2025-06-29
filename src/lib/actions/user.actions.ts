"use server";

import { cache } from "react";
import { config } from "../server/config";
import { createAdminClient, getLoggedInUser } from "../server/appwrite";
import { ID, Models, Query } from "node-appwrite";
import { TUserDetails, userDetails } from "@/constants/validations/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
        message: "User details fetched successfully.",
        data: response,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const updateUserInfo = async (
  { data, productId }: { data: Partial<TUserDetails>; productId?: string },
  id?: string,
  file?: File
) => {
  try {
    const { database } = await createAdminClient();
    let filePrev, res, watchlist;

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

export const getFilePreview = async (file: Models.File | undefined) => {
  if (!file) return;

  return `${config.appwrite.endpoint}/storage/buckets/${file.bucketId}/files/${
    file?.$id
  }/preview?project=${[config.appwrite.projectId]}`;
};

//watchlist logic
const updateWatchlist = async (productId: string) => {
  try {
    const { database } = await createAdminClient();
    const user = await getLoggedInUser();

    //check if the user is signed in
    if (!user) redirect("/sign-in");

    // get user watchlist
    const currentUser = await getUser(user?.$id);
    const watchlist = currentUser?.data?.documents?.[0].watchlist;

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
