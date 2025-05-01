export const config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
  appwrite: {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.APPWRITE_PROJECT_ID!,
    privatekey: process.env.APPWRITE_API_KEY!,
    databaseId: process.env.APPWRITE_DATABASE_ID!,
    usersCollection: process.env.APPWRITE_USERS_COLLECTION_ID!,
    productCollection: process.env.APPWRITE_PRODUCTS_COLLECTION_ID!,
    cartCollection: process.env.APPWRITE_CARTS_COLLECTION_ID!,
    storageId: process.env.APPWRITE_STORAGE_ID!,
  },
};
