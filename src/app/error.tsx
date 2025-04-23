"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest: string };
  reset: () => void;
}) => {
  return (
    <section className="w-full h-screen flex-center flex-col">
      <h1 className="text-2xl lg:text-4xl font-bold">Oops!</h1>
      <p className="text-base font-light">Something went wrong</p>

      <p className="text-lg font-medium">
        {error?.digest}: {error?.message}
      </p>

      <Button
        variant="ghost"
        onClick={reset}
        className="px-4 py-2 text-primary mt-10 place-self-center cursor-pointer"
      >
        Try Again
      </Button>
    </section>
  );
};

export default Error;
