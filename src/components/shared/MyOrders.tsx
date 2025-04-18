"use client";

import React from "react";
import { Button } from "../ui/button";
import { ShoppingBasket } from "lucide-react";

const MyOrders = () => {
  return (
    <Button
      variant="ghost"
      title="My Orders"
      size="icon"
      className="small-icons"
    >
      <ShoppingBasket />
    </Button>
  );
};

export default MyOrders;
