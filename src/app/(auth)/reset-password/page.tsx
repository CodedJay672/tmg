import ResetPasswordForm from "@/components/shared/ResetPasswordForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ResetPassword = async ({
  searchParams,
}: {
  searchParams: Promise<{ userId: string; secret: string }>;
}) => {
  const { userId, secret } = await searchParams;

  return (
    <section className="w-full max-w-lg bg-foreground border border-gray-300 rounded-lg py-6 px-3 space-y-4">
      <div className="w-full flex-center flex-col gap-2 my-6">
        <Image
          src="/assets/logo.png"
          alt="tmg procurement"
          width={140}
          height={32}
          className="rounded-full"
        />
        <p className="text-base font-medium">Recover your password.</p>

        <ResetPasswordForm userId={userId} secret={secret} />
      </div>
    </section>
  );
};

export default ResetPassword;
