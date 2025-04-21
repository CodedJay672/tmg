import AuthForm from "@/components/AuthForm";
import { getLoggedInUser } from "@/lib/server/appwrite";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const SignUp = async () => {
  const user = await getLoggedInUser();

  if (user) redirect("/");

  return (
    <section className="w-full max-w-lg bg-foreground border border-gray-300 rounded-lg py-6 px-3 space-y-4">
      <Link
        href="/"
        className="text-base text-primary font-medium place-self-end"
      >
        Go Home
      </Link>

      <div className="w-full flex-center flex-col gap-2 my-6">
        <h1 className="text-2xl font-bold">Logo</h1>
        <p className="text-base font-medium">Create you account.</p>
      </div>

      <AuthForm type="SIGN_UP" />
    </section>
  );
};

export default SignUp;
