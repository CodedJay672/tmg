"use client";

import React from "react";
import { Button } from "../ui/button";
import { MoreVerticalIcon } from "lucide-react";
import CustomSheet from "./CustomSheet";
import CustomerDetails from "./CustomerDetails";
import { Models } from "node-appwrite";

const CustomerTableActionButton = ({ info }: { info: Models.Document }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setOpen(true)}>
        <MoreVerticalIcon size={24} />
      </Button>
      <CustomSheet open={open} onOpenChange={setOpen}>
        <CustomerDetails info={info} />
      </CustomSheet>
    </>
  );
};

export default CustomerTableActionButton;
