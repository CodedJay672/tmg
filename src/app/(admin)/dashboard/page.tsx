import DashboardInfo from "@/components/DashboardInfo";
import InfoDoughnut from "@/components/shared/InfoDoughnut";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect("/sign-in");

  if (!user.labels.includes("admin")) redirect("/");

  return (
    <section className="dashboard-container">
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

      <div className="w-full py-2 flex items-center gap-6 overflow-x-scroll no-scrollbar my-4">
        <DashboardInfo heading="All Users" data="3000+" />
        <DashboardInfo
          heading="Total Tansactions"
          data={<InfoDoughnut title="Total Transaction" info={[80, 0, 60]} />}
        />
        <DashboardInfo
          heading="Orders & Invnoices"
          data={<InfoDoughnut title="Orders & Invoices" info={[80, 60, 90]} />}
        />
      </div>

      {/** monthly sales Chart */}

      {/** Table for all transactions */}
    </section>
  );
};

export default Dashboard;
