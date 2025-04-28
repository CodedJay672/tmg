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
      <h1 className="text-4xl lg:text-5xl font-bold">Oops!</h1>
      <p className="text-base font-light">Something went wrong</p>

      <p className="w-full max-w-lg text-base font-medium p-4">
        {error?.digest}:{" "}
        <span className="text-sm font-normal">{error?.message}</span>
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
