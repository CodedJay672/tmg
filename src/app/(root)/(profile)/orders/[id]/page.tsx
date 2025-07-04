import React, { Suspense } from "react";

import CustomTab from "@/components/shared/CustomTab";
import ProfileMenuSwitch from "@/components/shared/ProfileMenuSwitch";
import Segments from "@/components/shared/Segments";
import UserTransactionContent from "@/components/UserTransactionContent";
import { getCurrentUser } from "@/lib/data/user/getLoggedInUser";
import { LucideLoader2 } from "lucide-react";
import { notFound } from "next/navigation";

const Orders = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getCurrentUser();

  if (user?.documents?.[0].accountId !== id) return notFound();

  return (
    <section className="w-full">
      <div className="w-full lg:py-10 hidden lg:flex items-center gap-1">
        <Segments title="Orders" />
      </div>
      <div className="w-full lg:py-3 pb-2 flex justify-between items-center lg:justify-start mb-4 lg:mb-0 border-b border-dark-100">
        <h2 className="text-lg font-bold">My Orders</h2>

        <ProfileMenuSwitch />
      </div>

      <div className="w-full flex items-center space-x-3">
        <CustomTab title="all" name="userTransactions" />
        <CustomTab title="cancelled" name="userTransactions" />
        <CustomTab title="processing" name="userTransactions" />
        <CustomTab title="completed" name="userTransactions" />
      </div>

      <Suspense
        fallback={
          <p className="text-base text-gray-500 text-center">
            <LucideLoader2
              size={24}
              className="text-primary animate-spin mr-2"
            />{" "}
            Loading...
          </p>
        }
      >
        <UserTransactionContent userInfo={user?.documents?.[0]} />
      </Suspense>
    </section>
  );
};

export default Orders;
