"use client";

import React from "react";
import SearchBar from "../SearchBar";
import { usePathname, useRouter } from "next/navigation";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const isActive = pathname.includes("/search");

    if (isActive) return;

    router.push("/search");
  };

  return (
    <SearchBar
      action={handleClick}
      placeholder="Search over 300+ products..."
    />
  );
};

export default GlobalSearch;
