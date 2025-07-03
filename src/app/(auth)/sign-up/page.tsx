import AuthForm from "@/components/AuthForm";
import Image from "next/image";
import React from "react";

const SignUp = async () => {
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
        <p className="text-base font-medium">Create you account.</p>
      </div>

      <AuthForm type="SIGN_UP" />
    </section>
  );
};

export default SignUp;
