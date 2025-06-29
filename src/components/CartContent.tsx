"use client";

import { useStore } from "@/store/appStore";
import React, { useState } from "react";
import CartCard from "./shared/CartCard";
import Link from "next/link";
import { Button } from "./ui/button";
import { AppwriteException, Models } from "node-appwrite";
import { toast } from "sonner";
import { completeTransaction } from "@/lib/actions/cart.actions";

const CartContent = ({ user }: { user?: Models.Document }) => {
  const { cart, clearCart } = useStore();
  const total = cart?.reduce((init, item) => item.price * item.qty + init, 0);
  const vat = Math.ceil(total * 0.075);

  // get delivery details
  const [deliveryLocation, setDeliveryLocation] = useState(
    user?.delivery_location ?? ""
  );
  const [deliveryAddress, setDeliveryAddress] = useState(
    user?.delivery_address ?? ""
  );
  const [receiverName, setReceiverName] = useState(user?.receiver_name ?? "");
  const [receiverPhone, setReceiverPhone] = useState(
    user?.receiver_phone ?? ""
  );

  const handleCheckout = async () => {
    try {
      const response = await completeTransaction({
        userId: user?.$id,
        order: cart,
        subtotal: total,
        total: total + vat,
        location: user?.location,
        status: "PROCESSING",
        delivery_location: deliveryLocation,
        delivery_address: deliveryAddress,
        receiver_name: receiverName,
        receiver_phone: receiverPhone,
      });

      if (!response?.status) return toast.error(response?.message);

      clearCart();
      toast.success(response?.message);
    } catch (error) {
      if (error instanceof AppwriteException) toast.error(error.message);
      throw error;
    }
  };

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
        <div className="space-y-3 my-10 p-6 rounded-xl ">
          <h2 className="text-base lg:text-lg font-medium">
            Delivery information
          </h2>
          <form className="space-y-5">
            <input
              type="text"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              placeholder="Delivery location"
              disabled
              className="text-dark-300 p-3 border border-secondary outline-none bg-dark-100 w-full rounded-lg"
            />
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Delivery address"
              disabled
              className="text-dark-300 p-3 border border-secondary outline-none bg-dark-100 w-full rounded-lg"
            />
            <input
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="Receiver's name"
              disabled
              className="text-dark-300 p-3 border border-secondary outline-none bg-dark-100 w-full rounded-lg"
            />
            <input
              type="text"
              value={receiverPhone}
              onChange={(e) => setReceiverPhone(e.target.value)}
              placeholder="Receiver's phone"
              disabled
              className="text-dark-300 p-3 border border-secondary outline-none bg-dark-100 w-full rounded-lg"
            />
          </form>
        </div>
      )}

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
            <div className="flex-between mt-2">
              <p className="text-sm text-dark-300">VAT (7.5%)</p>
              <p className="text-sm font-bold">
                {vat.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
              </p>
            </div>
            <div className="flex-between mt-8 border-t border-gray-300 pt-2">
              <p className="text-sm text-dark-300">Total</p>
              <p className="text-sm font-bold">
                {(total + vat).toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
              </p>
            </div>

            <div className="w-full p-10 bg-secondary/30 rounded-xl border border-primary mt-10">
              <h2 className="text-sm font-medium">Bank information</h2>
              <div className="flex items-center gap-2 mt-3">
                <p className="text-sm font-medium">Acct No.:</p>
                <p className="text-sm font-normal text-pretty">01234567890</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Bank Name:</p>
                <p className="text-sm font-normal text-pretty">
                  ABC Bank of Africa
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Acct Name.:</p>
                <p className="text-sm font-normal text-pretty">
                  TMG Procurement bank
                </p>
              </div>
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
                  onClick={handleCheckout}
                  className="w-full bg-primary text-foreground cursor-pointer"
                >
                  Checkout
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
