import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatTitle } from "@/lib/utils";

const CategoryLink = ({ img, title }: { img: string; title: string }) => {
  return (
    <div className="w-32 flex-center flex-col gap-2">
      <Image
        src={img}
        alt="all category"
        width={170}
        height={80}
        className="hidden lg:block object-cover"
      />
      <Link
        href={`category/${title}`}
        className="hidden lg:block w-full text-lg leading-4.5 text-center text-dark-300 font-medium hover:underline"
      >
        {formatTitle(title)}
      </Link>
    </div>
  );
};

export default CategoryLink;
