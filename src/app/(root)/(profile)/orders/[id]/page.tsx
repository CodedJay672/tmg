import ProfileMenuSwitch from "@/components/shared/ProfileMenuSwitch";
import Segments from "@/components/shared/Segments";
import React from "react";

const Orders = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <section className="w-full">
      <div className="w-full py-3 lg:py-10 hidden lg:flex items-center gap-1">
        <Segments title="Orders" />
      </div>
      <div className="w-full lg:py-3 py-2 flex justify-between items-center lg:justify-start mb-4 lg:mb-0">
        <div className="">
          <h2 className="text-lg font-bold">Orders</h2>
          <p className="hidden lg:block text-base text-dark-300">
            Manage your orders.
          </p>
        </div>
        <ProfileMenuSwitch />
      </div>
    </section>
  );
};

export default Orders;
