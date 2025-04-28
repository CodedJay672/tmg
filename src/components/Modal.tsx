import React from "react";
import { Dialog } from "./ui/dialog";
import { DialogContent, DialogOverlay } from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog defaultOpen>
      <DialogOverlay>
        <DialogContent aria-describedby="custom modal">
          <div className="w-full px-4 py-6 place-content-end">
            <XIcon size={24} color="red" />
          </div>
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default Modal;
