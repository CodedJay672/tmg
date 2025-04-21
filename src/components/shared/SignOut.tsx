"use client";

import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const SignOut = () => {
  return (
    <div
      onClick={() => console.log("signed out.")}
      className="w-max flex items-center gap-1 cursor-pointer"
    >
      <LogOut size={16} className="text-red-500" />{" "}
      <span className="text-base text-red-500">Logout</span>
    </div>
  );
};

export default SignOut;
