"use client";

import React from "react";
import { Dialog } from "./ui/dialog";
import {
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { useStore } from "@/store/appStore";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const { showModal, toggleModal } = useStore();

  return (
    <Dialog open={showModal} onOpenChange={toggleModal}>
      <DialogOverlay className="fixed inset-0 place-items-center z-[999] grid bg-black/20 p-4">
        <DialogContent
          aria-describedby="custom modal"
          className="bg-foreground w-full max-w-md p-4 rounded-xl"
        >
          <DialogTitle>
            <div onClick={toggleModal} className="w-full flex justify-end">
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
