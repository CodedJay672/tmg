"use client";

import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { LucideAlignVerticalJustifyEnd, MoreVerticalIcon } from "lucide-react";
import GlobalContext from "@/context/GlobalContext";

const ProfileMenuSwitch = () => {
  const { toggleProfileMenu } = useContext(GlobalContext);

  return (
    <Button
      variant="ghost"
      onClick={toggleProfileMenu}
      className="flex justify-center items-center lg:hidden w-max"
      asChild
    >
      <MoreVerticalIcon size={44} />
    </Button>
  );
};

export default ProfileMenuSwitch;
