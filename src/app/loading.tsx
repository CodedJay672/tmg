import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <main className="w-full h-screen py-16 lg:py-24 flex justify-center relative">
      <div className="size-8 border-2 border-secondary absolute inset-0 -z-10" />
      <Loader2 size={32} className="animate-spin text-primary" />
    </main>
  );
};

export default Loading;
