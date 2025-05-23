"use client";

import { useStore } from "@/store/appStore";
import React from "react";
import CartCard from "./shared/CartCard";
import Link from "next/link";
import { Button } from "./ui/button";
import { Models } from "node-appwrite";

const CartContent = ({
  action,
  user,
}: {
  user?: Models.Document;
  action?: (t: boolean) => void;
}) => {
  const { cart, clearCart } = useStore();
  const total = cart.reduce((init, item) => item.price * item.qty + init, 0);

  return (
    <section className="w-full overflow-y-scroll no-scrollbar">
      <ul className="w-full mt-4 space-y-6">
        {cart.map((item) => (
          <li key={item.id} className="bg-dark-100/30 p-6 lg:p-3 rounded-lg">
            <CartCard user={user} data={item} />
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <div className="w-full">
          <div className="w-full mt-4 p-6 lg:p-3">
            <h2 className="text-base lg:text-lg font-semibold">Summary</h2>
            <div className="flex-between mt-2">
              <p className="text-sm text-dark-300">
                Subtotal ({cart.length} products)
              </p>
              <p className="text-sm font-bold">
                {total.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
              </p>
            </div>
            <div className="flex-between mt-8">
              <p className="text-sm text-dark-300">Total</p>
              <p className="text-sm font-bold">
                {total.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
              </p>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-6 p-6 mt-6">
            {user ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => clearCart()}
                  className="w-full bg-dark-100 text-dark-300 hover:bg-dark-100 cursor-pointer"
                >
                  Clear cart
                </Button>
                <Button
                  type="button"
                  variant="link"
                  onClick={action ? () => action(false) : () => null}
                  className="w-full bg-primary text-foreground cursor-pointer"
                >
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className="w-full rounded-md bg-primary text-foreground flex-center p-2"
                >
                  Create account
                </Link>
                <Link
                  href="/sign-in"
                  className="w-full rounded-md bg-primary text-foreground flex-center p-2"
                >
                  Login
                </Link>
              </>
            )}
          </div>
          <p className="text-sm font-light text-primary text-center">
            <span className="text-sm font-bold">Disclaimer:</span> Payment
            should be made on delivery.
          </p>
        </div>
      )}
    </section>
  );
};

export default CartContent;
