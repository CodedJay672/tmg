import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect("/sign-in");

  if (user.labels[0] !== "admin") redirect("/");

  return (
    <section className="w-full min-h-screen p-4 lg:p-6">
      <h2 className="text-xl lg:text-3xl font-medium">
        Welcome{" "}
        <span className="text-primary">{user.name.split(" ")[0]}👋🏼</span>
      </h2>
    </section>
  );
};

export default Dashboard;
