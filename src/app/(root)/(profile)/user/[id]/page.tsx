import ProfileMenuSwitch from "@/components/shared/ProfileMenuSwitch";
import Segments from "@/components/shared/Segments";
import UserDetailsForm from "@/components/UserDetailsForm";
import { getUser } from "@/lib/actions/user.actions";
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
    <section className="w-full">
      <div className="w-full py-3 lg:py-10 hidden lg:flex items-center gap-1">
        <Segments title="Personal data" />
      </div>
      <div className="w-full lg:py-3 py-2 flex justify-between items-center lg:justify-start mb-4 lg:mb-0">
        <div className="">
          <h2 className="text-lg font-bold">Personal Data.</h2>
          <p className="hidden lg:block text-base text-gray-400">
            Your personal information
          </p>
        </div>
        <ProfileMenuSwitch />
      </div>

      <UserDetailsForm user={userDetails.data?.documents?.[0]} />
    </section>
  );
};

export default ProfileDetails;
