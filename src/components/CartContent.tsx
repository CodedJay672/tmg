"use client";

import { useStore } from "@/store/appStore";
import React, { useId, useState } from "react";
import CartCard from "./shared/CartCard";
import Link from "next/link";
import { Button } from "./ui/button";
import { Models } from "node-appwrite";
import { toast } from "sonner";
import Modal from "./Modal";
import { completeTransaction } from "@/lib/actions/cart.actions";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";

const CartContent = ({ user }: { user?: Models.Document }) => {
  const [loading, setLoading] = useState(false);
  const { cart, clearCart, toggleModal } = useStore();
  const total = cart.reduce((init, item) => item.price * item.qty + init, 0);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const transactionEntry: TransactionEntryType = {
        userId: user?.$id,
        order: cart,
        total: total,
        location: user?.location,
        status: "PROCESSING",
      };

      const response = await completeTransaction(transactionEntry);

      if (!response?.status) return toast.error(response?.message);

      toggleModal();
      clearCart();
      return toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <aside className="w-full overflow-y-scroll no-scrollbar">
      <ul className="w-full mt-4 space-y-6">
        {cart.map((item) => (
          <li key={item.id} className="bg-dark-100/30 p-6 lg:p-3 rounded-lg">
            <CartCard user={user} data={item} />
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <>
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
                  onClick={toggleModal}
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

          <Modal>
            <Image
              src="/icons/error.png"
              alt="warning"
              width={48}
              height={48}
              className="mx-auto object-contain"
            />
            <h3 className="text-lg lg:text-xl font-bold text-dark-300 text-center">
              CONFIRM ORDER
            </h3>
            <p className="text-lg mt-6">
              Please ensure you have double checked your orders before
              proceeding to confirm the transaction.
            </p>

            <div className="w-full grid grid-cols-2 gap-3 mt-6">
              <Button
                onClick={toggleModal}
                className="w-full bg-transparent hover:bg-transparent border border-red-500 text-red-500"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full text-foreground"
              >
                {loading ? (
                  <Loader2Icon
                    size={16}
                    className="text-foreground animate-spin"
                  />
                ) : (
                  <>Confirm</>
                )}
              </Button>
            </div>
          </Modal>
        </>
      )}
    </aside>
  );
};

export default CartContent;
