"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface PaginationProps {
  data: {
    status: boolean;
    message: string;
  };
  isPlaceholderData: boolean;
}
const PaginationButtons = ({ isPlaceholderData }: PaginationProps) => {
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
        variant="outline"
        disabled={page === 0}
        className="bg-foreground border border-primary cursor-pointer"
      >
        <ChevronLeftIcon size={24} className=" text-primary font-bold" />
      </Button>
      <span className="text-lg font-black">{page + 1}</span>
      <Button
        size="icon"
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((old) => old + 1);
          }
        }}
        variant="outline"
        disabled={isPlaceholderData}
        className="bg-foreground border border-primary cursor-pointer"
      >
        <ChevronRightIcon size={24} className=" text-primary font-bold" />
      </Button>
    </div>
  );
};

export default PaginationButtons;
