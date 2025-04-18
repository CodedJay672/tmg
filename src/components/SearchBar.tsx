"use client";

import { SearchIcon } from "lucide-react";
import React from "react";

interface SearchProps {
  placeholder: string;
  handleClick?: () => void;
}

const SearchBar = ({ placeholder, handleClick }: SearchProps) => {
  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        className="w-90 px-3 py-2 pl-8 rounded-md border border-secondary outline-none placeholder:text-dark-200 text-sm font-light"
      />
      <SearchIcon
        size={20}
        className="absolute top-2 left-2 stroke-secondary"
      />
    </div>
  );
};

export default SearchBar;
