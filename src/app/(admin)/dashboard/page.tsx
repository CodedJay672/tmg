import DashboardInfo from "@/components/DashboardInfo";
import CustomTab from "@/components/shared/CustomTab";
import InfoDoughnut from "@/components/shared/InfoDoughnut";
import { smallTable } from "@/components/shared/table/columns";
import CustomTable from "@/components/shared/table/CustomTable";
import TransactionsChart from "@/components/TransactionsChart";
import { getTransaction } from "@/lib/actions/cart.actions";
import { getUser } from "@/lib/actions/user.actions";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { ChartData } from "chart.js";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect("/sign-in");

  if (!user.labels.includes("admin")) redirect("/");

  //get all transactions and users
  const transactions = await getTransaction();
  const users = await getUser();

  const data: ChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        fill: {
          target: "origin",
          above: "rgb(255, 0, 0)",
          below: "rgb(0, 0, 255)",
        },
        tension: 0.5,
        label: "Transactions",
        data: transactions?.data?.documents.map(
          (item) => item.total
        ) as number[],
      },
    ],
  };

  const doughnutData: ChartData<"doughnut"> = {
    labels: ["CANCELLED", "PROCESSING", "COMPLETED"],
    datasets: [
      {
        label: "all transactions",
        data: [80, 90, 100],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 205, 86)", "#4caf50"],
      },
    ],
  };

  return (
    <section className="dashboard-container">
      <div className="w-full space-y-1">
        <h2 className="admin-title">
          Welcome{" "}
          <span className="text-primary font-semibold">
            {user.name.split(" ")[0]}👋🏼
          </span>
        </h2>
        <p className="text-base lg:text-lg text-dark-300">
          See the general overview of your business.
        </p>
      </div>

      <div className="w-full py-2 flex items-center gap-6 overflow-x-scroll no-scrollbar my-4">
        <DashboardInfo
          data={transactions?.data?.total ?? 0}
          heading="Total Transactions"
        />
        <DashboardInfo data={users.data?.total ?? 0} heading="All Users" />
      </div>

      <div className="flex flex-col lg:flex-row gap-10 my-6">
        <div className="w-full space-y-6 flex-1 overflow-hidden">
          <div>
            <p className="text-base font-medium">Reports</p>
          </div>
          <TransactionsChart data={data} />
        </div>
        <div className="w-full max-w-96">
          <p className="text-base font-medium">Analytics</p>
          <div className="w-full overflow-hidden p-10 flex-center flex-col">
            <div className="w-full max-w-60">
              <InfoDoughnut title="All transactions" info={doughnutData} />
            </div>
            <div className="flex-between mt-10 gap-3">
              <div className="flex items-center gap-1">
                <div className="p-1 rounded-full bg-green-400" />
                <span className="text-sm">Success</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="p-1 rounded-full bg-red-400" />
                <span className="text-sm">Cancelled</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="p-1 rounded-full bg-amber-400" />
                <span className="text-sm">Processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-between flex-col lg:flex-row mt-10 gap-16">
        <div className="space-y-4 w-full overflow-hidden">
          <p className="text-base font-medium">Recent Orders</p>
          <CustomTable
            columns={smallTable}
            data={transactions?.data?.documents || []}
          />
        </div>
        <div className="space-y-4 w-full max-w-96">
          <p className="text-base font-medium">Top sellers</p>
          <CustomTable
            columns={smallTable}
            data={transactions?.data?.documents || []}
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
