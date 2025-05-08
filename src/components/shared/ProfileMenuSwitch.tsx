"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon } from "lucide-react";
import { useStore } from "@/store/appStore";

const ProfileMenuSwitch = () => {
  const { toggleProfileMenu } = useStore();

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
