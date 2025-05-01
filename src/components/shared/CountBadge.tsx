import React from "react";

interface TBadgeItems<T> {
  item: T[];
}

const CountBadge = <T,>({ item }: TBadgeItems<T>) => {
  return (
    <span className="size-4 bg-red-500 text-foreground text-[10px] flex-center rounded-full block">
      {item.length}
    </span>
  );
};

export default CountBadge;
