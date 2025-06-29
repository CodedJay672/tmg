"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { MoreVerticalIcon } from "lucide-react";
import CustomSheet from "./CustomSheet";
import AdminTransactionView from "../AdminTransactionView";
import { Models } from "node-appwrite";

const OrderTableActionButtons = ({ info }: { info: Models.Document }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setOpen(true)}
        className="cursor-pointer"
      >
        <MoreVerticalIcon size={24} className="text-dark-300" />
      </Button>
      <CustomSheet open={open} onOpenChange={setOpen}>
        <AdminTransactionView info={info} />
      </CustomSheet>
    </>
  );
};

export default OrderTableActionButtons;
