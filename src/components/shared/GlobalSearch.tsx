"use client";

import React from "react";
import SearchBar from "../SearchBar";
import { useRouter } from "next/navigation";

const GlobalSearch = () => {
  const router = useRouter();

  return (
    <SearchBar
      action={() => router.push("/search")}
      placeholder="Search over 300+ products..."
    />
  );
};

export default GlobalSearch;
