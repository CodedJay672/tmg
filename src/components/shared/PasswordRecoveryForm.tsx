"use client";

import React, { useState } from "react";
import CustomInput from "./CustomInput";
import SubmitButton from "./SubmitButton";
import { toast } from "sonner";
import { passwordRecovery } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { AppwriteException } from "node-appwrite";

const PasswordRecoveryForm = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;

    try {
      const response = await passwordRecovery(email);

      if (!response.status) {
        return toast.error(response.message);
      }

      toast.success(response.message);
      router.push("/sign-in");
    } catch (error) {
      if (error instanceof AppwriteException) toast.error(error.message);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6 px-4 lg:px-6">
      <CustomInput
        label="Email address"
        type="email"
        name="email"
        value={email}
        onChange={setEmail}
      />
      <small className="text-xs font-light text-primary">
        A recovery link will be sent to this email address
      </small>
      <SubmitButton label="Get link" />
    </form>
  );
};

export default PasswordRecoveryForm;
