import React from "react";

const Status = ({ status }: { status: string }) => {
  return (
    <span
      className={`text-xs py-1 px-3 border inline-block rounded-lg font-semibold ${
        status === "PROCESSING"
          ? "border-amber-500 text-amber-500"
          : status === "COMPLETED"
          ? "border-green-500 text-green-500"
          : "border-red-500 text-red-500"
      }`}
    >
      {status}
    </span>
  );
};

export default Status;
