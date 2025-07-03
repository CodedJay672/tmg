"use client";

import React, { useState } from "react";
import UserDropdownInfo from "../UserDropdownInfo";
import ProfileDropdown from "../ProfileDropdown";
import { Models } from "node-appwrite";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const UserInfo = ({ user }: { user: Models.Document }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="w-max bg-secondary flex items-center p-1 rounded-full pr-3 relative">
      <div className="size-7 bg-primary rounded-full flex-center shrink-0">
        <h2 className="text-sm uppercase font-medium">{user?.fullname[0]}</h2>
      </div>
      <span className="w-full text-sm ml-1 text-nowrap">{user?.fullname}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowDropdown((prev) => !prev)}
        className="size-6 ml-3 cursor-pointer"
      >
        <ChevronDownIcon
          className={cn(
            "transition-transform transform-gpu rotate-none duration-300",
            {
              "rotate-180": showDropdown,
            }
          )}
        />
      </Button>
      <ProfileDropdown show={showDropdown} setShow={setShowDropdown}>
        <UserDropdownInfo action={setShowDropdown} user={user} />
      </ProfileDropdown>
    </div>
  );
};

export default UserInfo;
