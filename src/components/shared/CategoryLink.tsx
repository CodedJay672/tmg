"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, formatTitle } from "@/lib/utils";

const CategoryLink = ({ img, title }: { img: string; title: string }) => {
  const pathname = usePathname();

  const path =
    title === "All"
      ? "/"
      : title === "Trending"
      ? "/trending"
      : `/category/${title}`;

  const isActive = (path: string) => {
    return pathname.endsWith(path);
  };

  return (
    <figure
      className={`p-1 lg:p-0 overflow-hidden cursor-pointer lg:pb-4 ${
        path === "/" || path === "/trending" ? "lg:hidden" : ""
      }`}
    >
      <Image
        src={img}
        alt="all category"
        width={170}
        height={80}
        className="hidden lg:block object-cover"
      />

      <figcaption
        className={cn(
          "place-self-center lg:mt-3 rounded-full transition-all p-0",
          {
            "lg:bg-secondary lg:px-2 lg:py-1": isActive(path),
          }
        )}
      >
        <Link
          href={path.toLowerCase()}
          className={cn(
            "hidden lg:block w-full text-base text-dark-300 font-medium hover:underline",
            {
              "text-dark-300": isActive(path),
            }
          )}
        >
          {formatTitle(title)}
        </Link>
      </figcaption>
    </figure>
  );
};

export default CategoryLink;
