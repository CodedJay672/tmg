"use server";

import { cache } from "react";
import { config } from "../server/config";
import { createAdminClient } from "../server/appwrite";
import { ID, Models, Query } from "node-appwrite";
import { TUserDetails, userDetails } from "@/constants/validations/schema";
import { revalidatePath } from "next/cache";

export const getUser = cache(
  async (
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
  }
);

export const updateUserInfo = async (
  file: File,
  { fullname, email, location, address, phone, imgUrl }: TUserDetails,
  id?: string
) => {
  try {
    const { database } = await createAdminClient();
    let filePrev, res;

    // check for a valid id
    if (!id) {
      return {
        status: false,
        message: "Invalid user id.",
      };
    }

    //validate form data
    const parsedData = userDetails.safeParse({
      fullname,
      email,
      location,
      address,
      phone,
      imgUrl,
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

      if (!res.status) {
        return {
          status: false,
          message: res.message,
        };
      }

      filePrev = await getFilePreview(res.data!);
    }

    // update the users imgUrl
    const response = await database.updateDocument(
      config.appwrite.databaseId,
      config.appwrite.usersCollection,
      id,
      {
        fullname,
        email,
        location,
        address,
        phone,
        imgUrl: filePrev,
      }
    );

    if (!response) {
      // delete file if it was uploaded
      file ?? (await deleteFile(res?.data?.$id!));

      return {
        status: false,
        message: "Profile update failed.",
      };
    }

    // revalidate path
    revalidatePath(`/user/${id}`);

    return {
      status: true,
      message: "Profile updated.",
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};

export const createFile = async (file: File) => {
  try {
    const { storage } = await createAdminClient();

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
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};

export const deleteFile = async (id: string) => {
  try {
    const { storage } = await createAdminClient();

    await storage.deleteFile(config.appwrite.storageId, id);
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};

export const getFilePreview = async (file: Models.File) => {
  return `${config.appwrite.endpoint}/storage/buckets/${file.bucketId}/files/${
    file?.$id
  }/preview?project=${[config.appwrite.projectId]}`;
};
