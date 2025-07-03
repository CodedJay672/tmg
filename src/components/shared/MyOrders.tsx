"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2Icon, ShoppingBasket } from "lucide-react";
import CountBadge from "./CountBadge";
import { useStore } from "@/store/appStore";
import CustomSheet from "./CustomSheet";
import CartContent from "../CartContent";
import { Models } from "node-appwrite";

const MyOrders = ({ user }: { user: Models.Document | undefined }) => {
  const { cart } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        title="My Orders"
        size="icon"
        onClick={() => setOpen(true)}
        className="w-max  px-2 border border-secondary relative"
      >
        <ShoppingBasket />
        {cart.length > 0 && (
          <div className="absolute -top-1 -right-1">
            <CountBadge item={cart} />
          </div>
        )}
        <span>View cart</span>
      </Button>
      <CustomSheet open={open} onOpenChange={setOpen}>
        <div className="w-full p-1">
          <h2 className="text-2xl font-semibold">Cart</h2>
          <p className="text-base text-dark-300">Cart preview.</p>
        </div>

        <CartContent action={setOpen} user={user} />
      </CustomSheet>
    </>
  );
};

export default MyOrders;
