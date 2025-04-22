import GoHome from "@/components/shared/GoHome";
import ProfileMenuSwitch from "@/components/shared/ProfileMenuSwitch";
import SidebarLinks from "@/components/SidebarLinks";
import UserDetailsForm from "@/components/UserDetailsForm";
import { getUser } from "@/lib/actions/user.actions";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ProfileDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const userDetails = await getUser(id);

  // redirect to signup if user is not signed in
  if (!userDetails.status) redirect("/sign-up");

  return (
    <section className="content-wrapper w-full">
      <div className="w-full py-3 lg:py-10 px-6 hidden lg:flex items-center gap-1">
        <GoHome text="Home" />
        <ChevronLeftIcon size={16} />
        <span className="font-bold">Personal details</span>
      </div>
      <div className="flex gap-3">
        <SidebarLinks user={userDetails?.data?.documents?.[0]} />
        <div className="w-full">
          <div className="w-full lg:py-3 py-2 px-4 flex justify-between items-center lg:justify-start">
            <div className="">
              <h2 className="text-lg font-bold">Personal Data</h2>
              <p className="hidden lg:block text-base text-gray-400">
                Your personal information
              </p>
            </div>
            <ProfileMenuSwitch />
          </div>

          <UserDetailsForm user={userDetails.data?.documents?.[0]} />
        </div>
      </div>
    </section>
  );
};

export default ProfileDetails;
