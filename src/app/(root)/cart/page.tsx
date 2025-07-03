import CartContent from "@/components/CartContent";
import Back from "@/components/shared/Back";
import { getCurrentUser } from "@/lib/data/user/getLoggedInUser";
import React from "react";

const CartPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <section className="content-wrapper max-w-screen-lg mx-auto">
      <div className="flex items-center">
        <Back />
        <div className="ml-1">
          <h2 className="text-base font-medium">Cart</h2>
          <p className="text-sm text-dark-300">Cart preview.</p>
        </div>
      </div>

      <CartContent user={currentUser?.documents?.[0]} />
    </section>
  );
};

export default CartPage;
