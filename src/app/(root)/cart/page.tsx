import CartContent from "@/components/CartContent";
import Back from "@/components/shared/Back";
import { getUser } from "@/lib/actions/user.actions";
import { getLoggedInUser } from "@/lib/server/appwrite";
import React from "react";

const CartPage = async () => {
  const user = await getLoggedInUser();

  return (
    <section className="content-wrapper">
      <div className="flex items-center">
        <Back />
        <div className="ml-1">
          <h2 className="text-base font-medium">Cart</h2>
          <p className="text-sm text-dark-300">Cart preview.</p>
        </div>
      </div>

      <CartContent userId={user.$id} />
    </section>
  );
};

export default CartPage;
