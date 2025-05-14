import CustomTab from "@/components/shared/CustomTab";
import ProfileMenuSwitch from "@/components/shared/ProfileMenuSwitch";
import Segments from "@/components/shared/Segments";
import UserTransactionContent from "@/components/UserTransactionContent";
import React from "react";

const Orders = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <section className="w-full">
      <div className="w-full py-3 lg:py-10 hidden lg:flex items-center gap-1">
        <Segments title="Orders" />
      </div>
      <div className="w-full lg:py-3 py-2 flex justify-between items-center lg:justify-start mb-4 lg:mb-0 border-b border-dark-100">
        <div className="">
          <h2 className="text-lg font-bold">My Orders</h2>
        </div>
        <ProfileMenuSwitch />
      </div>

      <div className="w-full">
        <div className="w-full flex items-center space-x-3">
          <CustomTab title="all" name="userTransactions" />
          <CustomTab title="cancelled" name="userTransactions" />
          <CustomTab title="processing" name="userTransactions" />
          <CustomTab title="completed" name="userTransactions" />
        </div>
      </div>
      <UserTransactionContent userId={id} />
    </section>
  );
};

export default Orders;
