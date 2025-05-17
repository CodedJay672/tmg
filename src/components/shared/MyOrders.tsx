"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2Icon, ShoppingBasket } from "lucide-react";
import CountBadge from "./CountBadge";
import { useStore } from "@/store/appStore";
import CustomSheet from "./CustomSheet";
import CartContent from "../CartContent";
import { useGetUserById } from "@/lib/queries/userQueried/users";

const MyOrders = ({ userId }: { userId: string }) => {
  const { cart } = useStore();
  const { data: userInfo, isLoading: loading } = useGetUserById(userId);
  const [open, setOpen] = useState(false);

  if (loading) {
    return <Loader2Icon size={24} className="text-primary animate-spin" />;
  }
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
          <h2 className="text-base font-medium">Cart</h2>
          <p className="text-sm text-dark-300">Cart preview.</p>
        </div>

        <CartContent user={userInfo?.data?.documents?.[0]} />
      </CustomSheet>
    </>
  );
};

export default MyOrders;
