"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="default"
      disabled={pending}
      className={cn("w-full bg-primary text-foreground font-medium mt-2", {
        "bg-secondary text-gray-200": pending,
      })}
    >
      {pending && (
        <Loader2 size={24} className="text-foreground animate-spin" />
      )}

      {pending ? "Submitting..." : label}
    </Button>
  );
};

export default SubmitButton;
