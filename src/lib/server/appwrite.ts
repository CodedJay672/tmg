"use server";

import { Client, Account, Databases } from "node-appwrite";
import { cookies } from "next/headers";
import { config } from "./config";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(config.appwrite.endpoint)
    .setProject(config.appwrite.projectId);

  const session = (await cookies()).get("tmg-session");

  if (!session || !session.value) {
    throw new Error("No session");
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
  };
}

export const getLoggedInUser = async () => {
  const { account } = await createSessionClient();

  return await account.get();
};
