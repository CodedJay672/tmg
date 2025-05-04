import SidebarLinks from "@/components/SidebarLinks";
import { getUser } from "@/lib/actions/user.actions";
import { getLoggedInUser } from "@/lib/server/appwrite";
import React from "react";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
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
