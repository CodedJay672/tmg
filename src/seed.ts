import { Client, Databases, ID } from "node-appwrite";
import { LOCATION_CHARGES } from "./constants";
import { config } from "dotenv";

//configure the dotenv to make .env readable
config({ path: ".env.local" });

//initialize the appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

//seeding function for database
async function seedDB() {
  console.log("Seeding started.");

  try {
    const database = new Databases(client);

    for (const item of LOCATION_CHARGES) {
      const response = await database.createDocument(
        process.env.APPWRITE_DATABASE_ID!,
        process.env.APPWRITE_LOCATIONS_COLLECTION_ID!,
        ID.unique(),
        {
          location: item.state,
          charge: item.charge,
        }
      );

      if (!response) throw new Error("Failed to seed data");
    }

    console.log("Data seeded succesfully!");
  } catch (error) {
    throw error;
  }
}

//call seed
seedDB();
