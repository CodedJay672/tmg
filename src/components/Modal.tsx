"use client";

import React, { Dispatch } from "react";
import { Dialog } from "./ui/dialog";
import {
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: Dispatch<boolean>;
}
const Modal = ({ open, onOpenChange, children }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 place-items-center z-[999] grid bg-black/40 p-4">
        <DialogContent
          aria-describedby={undefined}
          className="bg-foreground w-full max-w-md p-4 pb-12 rounded-xl animate-in"
        >
          <DialogTitle>
            <div
              onClick={() => onOpenChange(false)}
              className="w-full flex justify-end"
            >
              <XIcon size={24} className="text-red-500 cursor-pointer" />
            </div>
          </DialogTitle>
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default Modal;
