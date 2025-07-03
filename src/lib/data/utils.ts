import "server-only";

import { config } from "../server/config";
import { Models } from "node-appwrite";

export const getFilePreview = async (file: Models.File | undefined) => {
  if (!file) return;

  return `${config.appwrite.endpoint}/storage/buckets/${file.bucketId}/files/${
    file?.$id
  }/preview?project=${[config.appwrite.projectId]}`;
};
