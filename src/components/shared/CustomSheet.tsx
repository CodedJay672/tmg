"use client";

import React, { Dispatch } from "react";
import { Sheet, SheetContent } from "../ui/sheet";
import { useStore } from "@/store/appStore";
import { DialogTitle } from "@radix-ui/react-dialog";

interface CustomSheetProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: Dispatch<boolean>;
}

const CustomSheet = ({ open, onOpenChange, children }: CustomSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
