"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";

const Back = () => {
  const router = useRouter();

  return (
    <Button variant="ghost" onClick={() => router.back()}>
      <ChevronLeftIcon size={24} />
    </Button>
  );
};

export default Back;
