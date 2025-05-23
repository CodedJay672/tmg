import CartContent from "@/components/CartContent";
import DeliveryDetailsForm from "@/components/shared/DeliveryDetailsForm";
import { getUser } from "@/lib/actions/user.actions";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import React from "react";

const Confirmation = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect("/sign-in");

  const currentUser = await getUser(user?.$id);

  return (
    <section className="content-wrapper">
      <div className="px-4 py-10 lg:p-10">
        <h1 className="text-xl lg:text-2xl font-bold">
          Order confirmation and checkout
        </h1>

        <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-66 p-0 lg:p-10">
          <div className="w-full lg:w-3/5 order-2 lg:order-1">
            <h3 className="text-lg lg:text-xl font-semibold text-dark-300 border-b border-primary p-2">
              Cart details
            </h3>
          </div>
          <div className="w-full lg:w-2/5 order-1 lg:order-2 mt-10 lg:mt-0">
            <h3 className="text-lg lg:text-xl font-semibold text-dark-300 border-b border-primary p-2">
              Delivery details
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Confirmation;
