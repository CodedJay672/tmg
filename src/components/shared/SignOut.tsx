"use client";

import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const SignOut = () => {
  return (
    <Button
      variant="ghost"
      onClick={() => console.log("signed out.")}
      className="w-max text-red-500"
    >
      <LogOut size={16} /> Logout
    </Button>
  );
};

export default SignOut;
