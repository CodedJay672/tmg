"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Models } from "node-appwrite";

interface PaginationProps {
  data: {
    status: boolean;
    message: string;
    data: Models.DocumentList<Models.Document>;
  };
  isPlaceholderData: boolean;
}
const PaginationButtons = ({ data, isPlaceholderData }: PaginationProps) => {
  const [page, setPage] = useState(0);
  const param = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const newParam = new URLSearchParams(param.toString());

    if (page > 0) {
      newParam.set("page", `${page}`);
    } else {
      newParam.delete("page");
    }

    replace(`${pathname}?${newParam}`, { scroll: false });
  }, [page]);

  return (
    <div className="w-max flex justify-center items-center gap-4">
      <Button
        size="icon"
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        <ChevronLeftIcon size={20} className=" text-foreground font-bold" />
      </Button>
      <span className="text-lg font-black">{page + 1}</span>
      <Button
        size="icon"
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPlaceholderData}
      >
        <ChevronRightIcon size={20} className=" text-foreground font-bold" />
      </Button>
    </div>
  );
};

export default PaginationButtons;
