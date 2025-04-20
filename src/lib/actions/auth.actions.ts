"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { config } from "../server/config";
import {
  AuthSchema,
  resetPasswordSchema,
} from "@/constants/validations/schema";

export const SignIn = async (email: string, password: string) => {
  try {
    const { account } = await createAdminClient();
    const schema = AuthSchema("SIGN_IN");

    // data validation with zod
    const parsedData = schema.safeParse({ email, password });

    if (!parsedData.success) {
      return {
        status: false,
        message: "Data validation Failed",
      };
    }

    const session = await account.createEmailPasswordSession(email, password);

    if (!session) {
      return {
        status: false,
        message: "Failed to sign in. Try again later.",
      };
    }

    (await cookies()).set("tmg-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return {
      status: true,
      message: "Signed in successfully.",
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};

export const signUp = async (values: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = values;

    const schema = AuthSchema("SIGN_UP");

    // data validation with zod
    const parsedData = schema.safeParse({
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
    });

    if (!parsedData.success) {
      return {
        status: false,
        message: "The forrm contains some errors.",
        data: parsedData.error.flatten().fieldErrors,
      };
    }

    const name = `${firstname} ${lastname}`;
    const { account } = await createAdminClient();

    // create the user account
    const user = await account.create(ID.unique(), email, password, name);

    //sign the user in with email and password
    await SignIn(email, password);

    //create database entry for the new user
    const savedUser = await saveToDB(name, email, user.$id);

    if (!savedUser.status) {
      return {
        status: false,
        message: savedUser.message,
      };
    }

    return {
      status: true,
      message: "Signed up successfully.",
      data: savedUser.data,
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};

export async function signOut(): Promise<void> {
  const { account } = await createSessionClient();

  (await cookies()).delete("my-custom-session");
  await account?.deleteSession("current");

  redirect("/signup");
}

const saveToDB = async (name: string, email: string, accountId: string) => {
  try {
    const { database } = await createAdminClient();

    const result = await database.createDocument(
      config.appwrite.databaseId,
      config.appwrite.usersCollection,
      ID.unique(),
      {
        fullname: name,
        email,
        accountId,
      }
    );

    if (!result) {
      return {
        status: false,
        message: "Failed to add record",
      };
    }

    return {
      status: true,
      message: "Record added successfully.",
      data: result,
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
};

//password recovery and account verification
export const passwordRecovery = async (email: string) => {
  try {
    const { account } = await createAdminClient();

    const response = account.createRecovery(
      email,
      config.baseUrl ?? "http://localhost:3000/reset-password"
    );

    if (!response) {
      return {
        status: false,
        message: "Password recovery failed.",
      };
    }

    return {
      status: true,
      message: "Reset link has been sent to the email address.",
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

export const resetPassword = async (
  userId: string,
  secret: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const { account } = await createAdminClient();

    // verify the user data
    const parsedData = resetPasswordSchema.safeParse({
      password,
      confirmPassword,
    });

    if (!parsedData.success) {
      return {
        status: false,
        message: "Something is wrong with your entry.",
        data: parsedData.error.flatten().fieldErrors,
      };
    }

    const response = account.updateRecovery(userId, secret, password);

    if (!response) {
      return {
        status: false,
        message: "Failed to reset your password.",
      };
    }

    return {
      status: true,
      message: "Your password has been reset.",
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
