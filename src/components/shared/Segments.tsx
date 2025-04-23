import React from "react";

import { ChevronLeftIcon } from "lucide-react";
import GoHome from "./GoHome";
import { formatTitle } from "@/lib/utils";

const Segments = ({ title }: { title: string }) => {
  const formattedTitle = formatTitle(title);

  return (
    <div className="flex items-center gap-1">
      <GoHome text="Home" />
      <ChevronLeftIcon size={16} />
      <span className="font-bold">{formattedTitle}</span>
    </div>
  );
};

export default Segments;
