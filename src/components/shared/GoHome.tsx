import Link from "next/link";
import React from "react";

const GoHome = ({ text }: { text: string }) => {
  return (
    <Link href="/" className="text-gray-400">
      {text}
    </Link>
  );
};

export default GoHome;
