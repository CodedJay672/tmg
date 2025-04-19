"use client";

import React, { useState } from "react";
import CustomInput from "./shared/CustomInput";
import SubmitButton from "./shared/SubmitButton";
import { GlobeIcon } from "lucide-react";
import { SignIn, signUp } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AuthForm = ({ type }: { type: "SIGN_IN" | "SIGN_UP" }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // get the form data from the form event object
    const formData = new FormData(event.currentTarget);

    //extract all data one by one
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (type === "SIGN_UP" && password !== confirmPassword) {
      return toast.error("Password mismatch.");
    }

    try {
      if (type === "SIGN_UP") {
        const response = await signUp({
          firstname,
          lastname,
          email,
          password,
          confirmPassword,
        });

        if (!response.status) {
          return toast.error(response.message);
        }

        toast.success(response.message);
        router.push("/");
      }

      const response = await SignIn(email, password);

      if (!response.status) {
        return toast.error(response.message);
      }

      toast.success(response.message);
      router.push("/");
    } catch (error: any) {
      return toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 px-4 lg:px-6">
      {type === "SIGN_UP" && (
        <div className="flex-between gap-2 lg:gap-3">
          <CustomInput
            label="Firstname"
            type="text"
            name="firstname"
            value={firstname}
            onChange={setFirstname}
          />
          <CustomInput
            label="lastname"
            type="text"
            name="lastname"
            value={lastname}
            onChange={setLastname}
          />
        </div>
      )}

      <CustomInput
        label="email"
        type="email"
        name="email"
        value={email}
        onChange={setEmail}
      />

      <div
        className={`flex-between ${
          type === "SIGN_IN" ? "flex-col" : "flex-row"
        } gap-2 lg:gap-3 mt-4`}
      >
        <CustomInput
          label="password"
          type="password"
          name="password"
          value={password}
          onChange={setPassword}
        />
        {type === "SIGN_IN" && (
          <Link
            href="/recover-password"
            className="text-sm text-red-400 place-self-end"
          >
            Forgotten password?
          </Link>
        )}

        {type === "SIGN_UP" && (
          <CustomInput
            label="Confirm password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        )}
      </div>

      {type === "SIGN_UP" && (
        <p className="w-full text-center text-xs ">
          By creating an account, you <b>agree</b> to{" "}
          <span className="text-secondary">Terms of Use</span> and{" "}
          <span className="text-secondary">Privacy Policy</span>
        </p>
      )}

      <SubmitButton label={type === "SIGN_IN" ? "Sign in" : "Create account"} />

      {type === "SIGN_IN" ? (
        <p className="text-sm text-center w-full">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-bold text-primary">
            Create account
          </Link>
        </p>
      ) : (
        <p className="w-full text-center">
          Aready created an account?{" "}
          <Link href="/sign-in" className="text-bold text-primary">
            Login
          </Link>
        </p>
      )}

      <div className="flex-between gap-1 my-6">
        <div className="w-full border border-secondary/50" />
        <span className="text-xs lg:text-sm text-primary">Or</span>
        <div className="w-full border border-secondary/50" />
      </div>

      <div className="w-max mx-auto flex-center gap-1 border border-secondary rounded-md py-2 px-4 cursor-pointer hover:bg-secondary/10 transition-all">
        <GlobeIcon size={20} />
        Sign in with Google
      </div>
    </form>
  );
};

export default AuthForm;
