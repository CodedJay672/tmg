"use client";

import { useMemo } from "react";

const DashboardInfo = ({
  heading,
  data,
  background,
}: {
  heading: string;
  data: number;
  background?: string;
}) => {
  const formattedData = useMemo(() => {
    if (data < 1000) return data;
    else if (data > 1000 && data < 1000000) {
      const result = Math.round(data / 1000);
      return `${result}K`;
    } else {
      const result = Math.round(data / 1000000);
      return `${result}M`;
    }
  }, [data]);

  return (
    <article
      style={{ backgroundColor: background }}
      className="w-2xs lg:w-1/3 shrink-0 h-36 lg:h-32 p-4 py-6 lg:p-6 lg:py-3 rounded-lg shadow-md space-y-2 lg:space-y-1"
    >
      <h3 className="text-base font-medium">{heading}</h3>

      <p className="text-2xl lg:text-4xl leading-16 font-medium">
        {formattedData}
      </p>
    </article>
  );
};

export default DashboardInfo;
