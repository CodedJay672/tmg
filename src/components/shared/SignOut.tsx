"use client";

import React, { useContext } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import GlobalContext from "@/context/GlobalContext";

const SignOut = () => {
  const { toggleDropdown, toggleProfileMenu } = useContext(GlobalContext);

  const handleLogout = async () => {
    await signOut();

    return toast.success("User logged out.");
  };

  return (
    <>
      <div
        onClick={() => {
          toggleDropdown();
          handleLogout();
        }}
        className="hidden w-max lg:flex items-center gap-3 cursor-pointer"
      >
        <LogOut size={16} className="text-red-500" />{" "}
        <span className="text-base text-red-500">Logout</span>
      </div>

      <div
        onClick={() => {
          toggleProfileMenu();
          handleLogout();
        }}
        className="w-max flex items-center gap-3 cursor-pointer lg:hidden"
      >
        <LogOut size={16} className="text-red-500" />{" "}
        <span className="text-base text-red-500">Logout</span>
      </div>
    </>
  );
};

export default SignOut;
