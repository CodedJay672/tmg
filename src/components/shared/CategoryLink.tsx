"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, formatTitle } from "@/lib/utils";
import { Button } from "../ui/button";
import GlobalContext from "@/context/GlobalContext";

const CategoryLink = ({ img, title }: { img: string; title: string }) => {
  const pathname = usePathname();
  const { category, changeCategory } = useContext(GlobalContext);

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
      className={`p-1 lg:p-0 rounded-md overflow-hidden cursor-pointer lg:shadow-md  lg:pb-4 ${
        path === "/" || path === "/trending" ? "lg:hidden" : ""
      }`}
    >
      <Image
        src={img}
        alt="all category"
        width={200}
        height={140}
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
        {/**
         * Mobile devices use button to change the tabs and fetch different
         * products according to category
         *
         **/}

        <Button
          variant="ghost"
          onClick={() => changeCategory(title)}
          className={cn(
            "lg:hidden w-full text-sm text-dark-200 font-medium transition-all px-1",
            {
              "text-primary font-medium rounded-full":
                category === title.toLowerCase(),
            }
          )}
        >
          {formatTitle(title)}
        </Button>

        {/**
         * wider screens use Links to navigate the user to a different
         * category page, with its own fetched products
         *
         **/}
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
