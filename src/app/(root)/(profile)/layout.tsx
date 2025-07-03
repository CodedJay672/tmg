import SidebarLinks from "@/components/SidebarLinks";
import { getLoggedInUser, getUser } from "@/lib/data/user/getLoggedInUser";
import React from "react";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  // parallel fetching is automatic in pages and routes
  const user = await getLoggedInUser();
  const userDetails = await getUser(user?.$id);

  return (
    <main className="content-wrapper lg:flex gap-10">
      <div className="mt-2 lg:mt-10">
        <SidebarLinks user={userDetails?.data?.documents?.[0]} />
      </div>
      {children}
    </main>
  );
};

export default HomeLayout;
