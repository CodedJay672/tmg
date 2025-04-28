"use client";

import React, { useRef } from "react";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = ({
  placeholder,
  action,
}: {
  placeholder: string;
  action?: () => void;
}) => {
  const router = useRouter();
  const param = useSearchParams();
  const pathname = usePathname();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchProducts = useDebouncedCallback((searchTerm: string) => {
    const queryString = new URLSearchParams(param);

    if (searchTerm) {
      //attach the query string to the route
      queryString.set("query", searchTerm.trim());
    } else {
      //delete the query if there is no search string
      queryString.delete("query");
    }

    //replace the route
    router.replace(`${pathname}?${queryString.toString()}`);
  }, 300);

  return (
    <div className="w-full relative">
      <input
        placeholder={placeholder}
        ref={inputRef}
        defaultValue={param.get("query")?.toString()}
        onChange={(e) => searchProducts(e.target.value)}
        onClick={action}
        className="w-full px-3 py-2 pl-8 rounded-md border border-secondary outline-none placeholder:text-dark-200 text-sm font-light"
      />
      <SearchIcon
        size={20}
        className="absolute top-2 left-2 stroke-secondary"
      />
    </div>
  );
};

export default SearchBar;
