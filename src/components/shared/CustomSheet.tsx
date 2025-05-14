"use client";

import React from "react";
import { Sheet, SheetContent } from "../ui/sheet";
import { useStore } from "@/store/appStore";
import { DialogTitle } from "@radix-ui/react-dialog";

const CustomSheet = ({ children }: { children: React.ReactNode }) => {
  const { showPopover, togglePopover } = useStore();

  return (
    <Sheet open={showPopover} onOpenChange={togglePopover}>
      <SheetContent
        role="popover"
        aria-describedby={undefined}
        className="w-full px-4 bg-foreground p-3"
      >
        <DialogTitle className="hidden">Details</DialogTitle>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;
