"use server";

import { cache } from "react";
import { Client, Account, Databases, Storage } from "node-appwrite";
import { cookies } from "next/headers";
import { config } from "./config";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(config.appwrite.endpoint)
    .setProject(config.appwrite.projectId);

  const session = (await cookies()).get("tmg-session");

  if (!session || !session.value) {
    console.log("No session");
    return null;
  }

  client.setSession(session?.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(config.appwrite.endpoint)
    .setProject(config.appwrite.projectId)
    .setKey(config.appwrite.privatekey);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}

export const getLoggedInUser = cache(async () => {
  const response = await createSessionClient();

  if (!response) return;

  const { account } = response;

  return await account.get();
});
