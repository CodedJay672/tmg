import DashboardInfo from "@/components/DashboardInfo";
import InfoDoughnut from "@/components/shared/InfoDoughnut";
import { orderTable, smallTable } from "@/components/shared/table/columns";
import CustomTable from "@/components/shared/table/CustomTable";
import TransactionsChart from "@/components/TransactionsChart";
import { getTransaction, getUserCart } from "@/lib/actions/cart.actions";
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
  const transactions = getTransaction();
  const users = getUser();
  const orders = getUserCart();

  const [transactionData, usersData, ordersData] = await Promise.all([
    transactions,
    users,
    orders,
  ]);

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
        data: transactionData?.data?.documents.map(
          (item) => item.total
        ) as number[],
      },
    ],
  };

  // get the number of transactions according to their status
  const completed = transactionData.data?.documents.filter(
    (item) => item.status === "COMPLETED"
  );
  const cancelled = transactionData.data?.documents.filter(
    (item) => item.status === "CANCELLED"
  );
  const processing = transactionData.data?.documents.filter(
    (item) => item.status === "PROCESSING"
  );

  const doughnutData: ChartData<"doughnut"> = {
    labels: ["CANCELLED", "PROCESSING", "COMPLETED"],
    datasets: [
      {
        label: "all transactions",
        data: [
          cancelled?.length ?? 0,
          processing?.length ?? 0,
          completed?.length ?? 0,
        ],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 205, 86)", "#4caf50"],
      },
    ],
  };

  return (
    <section className="min-h-screen w-full">
      <div className="w-full space-y-1 my-10">
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

      <div className="w-full flex gap-6 flex-col lg:flex-row">
        <div className="flex-1 xl:w-2xl 2xl:w-full">
          <div className="flex-1 flex items-center gap-6 overflow-x-scroll no-scrollbar mb-4">
            <DashboardInfo
              data={transactionData?.data?.total ?? 0}
              heading="Total Transactions"
              background="#3B82F6"
            />
            <DashboardInfo
              data={usersData.data?.total ?? 0}
              heading="All Users"
              background="#8B5CF6"
            />
            <DashboardInfo
              data={ordersData.data?.total ?? 0}
              heading="All Orders"
              background="#22C55E"
            />
          </div>
          {/* <div className="flex flex-col lg:flex-row gap-10 my-6">
            <div className="w-full space-y-6 flex-1 overflow-hidden border border-gray-200 shadow-md shadow-gray-300 rounded-xl p-5">
              <div>
                <p className="text-base lg:text-lg font-medium">Reports</p>
              </div>
              <TransactionsChart data={data} />
            </div>
            
          </div> */}
          <div className="p-5 w-full shadow-md bg-white z-0 rouned-lg mt-10 overflow-x-scroll no-scrollbar">
            <p className="text-base lg:text-lg font-medium mb-6">Top sellers</p>
            <CustomTable
              columns={orderTable}
              data={transactionData?.data?.documents.slice(0, 6) || []}
            />
          </div>
        </div>
        <div className="w-full lg:w-64 space-y-4">
          <div className="w-full shadow-md flex flex-col rounded-xl p-5 bg-white mb-10">
            <p className="text-base lg:text-lg font-medium">Analytics</p>
            <div className="w-full mt-4 flex-1 overflow-hidden flex-between flex-col">
              {doughnutData ? (
                <div className="w-full max-w-40">
                  <InfoDoughnut info={doughnutData} />
                </div>
              ) : (
                <div className="flex-center">
                  <p className="w-full text-center">No data.</p>
                </div>
              )}
              <div className="flex-between gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <div
                    style={{ background: "#4caf50" }}
                    className="p-1 rounded-full"
                  />
                  <span className="text-sm">Success</span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    style={{ background: "#FF6384" }}
                    className="p-1 rounded-full"
                  />
                  <span className="text-sm">Cancelled</span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    style={{ background: "#FFCC29" }}
                    className="p-1 rounded-full"
                  />
                  <span className="text-sm">Processing</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 w-full p-5 overflow-hidden shadow-md bg-white rounded-lg">
            <p className="text-base lg:text-lg font-medium mb-6">
              Recent Orders
            </p>
            <CustomTable
              columns={smallTable}
              data={transactionData?.data?.documents.slice(0, 6) || []}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
