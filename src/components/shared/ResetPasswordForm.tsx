"use client";

import React, { useState } from "react";
import CustomInput from "./CustomInput";
import SubmitButton from "./SubmitButton";
import { toast } from "sonner";
import { resetPassword } from "@/lib/actions/auth.actions";

const ResetPasswordForm = ({
  userId,
  secret,
}: {
  userId: string;
  secret: string;
}) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirm) {
      return toast.error("Password mismatch");
    }

    try {
      const formData = new FormData(event.currentTarget);

      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirm") as string;

      const response = await resetPassword(
        userId,
        secret,
        password,
        confirmPassword
      );

      if (!response.status) {
        if (response.data) setErrors(response.data as any);
        return toast.error(response.message);
      }

      return toast.success(response.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 px-4 lg:px-5">
      <CustomInput
        label="New passwowrd"
        type="password"
        name="password"
        value={password}
        onChange={setPassword}
      />

      <CustomInput
        label="Confirm password"
        type="password"
        name="confirm"
        value={confirm}
        onChange={setConfirm}
      />

      <SubmitButton label="Reset password" />
    </form>
  );
};

export default ResetPasswordForm;
