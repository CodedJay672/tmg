import ProfileMenuSwitch from "@/components/shared/ProfileMenuSwitch";
import SidebarLinks from "@/components/SidebarLinks";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

const ProfileDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const userDetails = await getCurrentUser(id);

  // redirect to signup if user is not signed in
  if (!userDetails.status) redirect("/sign-up");

  return (
    <section className="content-wrapper w-full lg:flex gap-10">
      <SidebarLinks user={{}} />
      <div className="place-self-end">
        <ProfileMenuSwitch />
      </div>
    </section>
  );
};

export default ProfileDetails;
