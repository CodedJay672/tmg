import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect("/sign-in");

  if (user.labels[0] !== "admin") redirect("/");

  return (
    <section className="w-full min-h-screen p-4 lg:p-6">
      <header className="w-full space-y-1">
        <h2 className="text-xl lg:text-3xl font-medium">
          Welcome{" "}
          <span className="text-primary font-semibold">
            {user.name.split(" ")[0]}👋🏼
          </span>
        </h2>
        <p className="text-base lg:text-lg text-gray-400">
          See the general overview of your business.
        </p>
      </header>

      {/** Dashboard metrics: Overflow-x-scroll for mobile phones
       *
       * Total users
       *
       * Total orders:- processing, completed cancelled.
       *
       * invoices:- processing, paid.
       */}

      {/** monthly sales Chart */}

      {/** Table for all transactions */}
    </section>
  );
};

export default Dashboard;
