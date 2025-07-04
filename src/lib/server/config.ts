export const config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
  resend: process.env.RESEND_API_SECRET!,
  appwrite: {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.APPWRITE_PROJECT_ID!,
    privatekey: process.env.APPWRITE_API_KEY!,
    databaseId: process.env.APPWRITE_DATABASE_ID!,
    usersCollection: process.env.APPWRITE_USERS_COLLECTION_ID!,
    watchlistCollection: process.env.APPWRITE_WATCHLIST_COLLECTION_ID!,
    productCollection: process.env.APPWRITE_PRODUCTS_COLLECTION_ID!,
    transactionsCollection: process.env.APPWRITE_TRANSACTIONS_COLLECTION_ID!,
    cartCollection: process.env.APPWRITE_CARTS_COLLECTION_ID!,
    locationCollection: process.env.APPWRITE_LOCATIONS_COLLECTION_ID!,
    storageId: process.env.APPWRITE_STORAGE_ID!,
  },
};
