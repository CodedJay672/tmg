"use client";

import React, { useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useStore } from "@/store/appStore";
import { usePathname, useSearchParams } from "next/navigation";

const CustomTab = ({ name }: { name: string }) => {
  const searchParam = useSearchParams();

  // get the query string
  const query = searchParam.get("query");
  const { category, changeCategory } = useStore();
  const pathname = usePathname();

  useEffect(() => {
    changeCategory(query ?? "all");
  }, [query]);

  const href = useMemo(
    () => ({
      pathname,
      query: { query: name ?? "all" },
    }),
    [pathname, name]
  );

  return (
    <Link
      href={href}
      onNavigate={() => changeCategory(name ?? "all")}
      replace
      className={cn(
        "text-base text-dark-200 font-medium transition-all px-1 capitalize",
        {
          "text-primary font-medium border-b-4 border-primary":
            category === name,
        }
      )}
    >
      {name ?? "all"}
    </Link>
  );
};

export default CustomTab;
