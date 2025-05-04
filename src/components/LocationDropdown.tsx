"use client";

import {
  useGetUserById,
  useUpdateUserInfo,
} from "@/lib/queries/userQueried/users";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, Loader2Icon, MapPinIcon } from "lucide-react";
import { Models } from "node-appwrite";
import React, { useEffect, useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import CustomInput from "./shared/CustomInput";
import SubmitButton from "./shared/SubmitButton";
import { toast } from "sonner";
import { getUser } from "@/lib/actions/user.actions";
import { useStore } from "@/store/appStore";

const LocationDropdown = ({
  user,
}: {
  user: Models.User<Models.Preferences>;
}) => {
  const {
    data: userInfo,
    isPending: loading,
    isError: error,
  } = useGetUserById(user.$id);
  const { showDropdown, toggleDropdown } = useStore();
  const { mutateAsync: updateLocation, isPending: loadingLocation } =
    useUpdateUserInfo();
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!loading && userInfo?.status) {
      setLocation(userInfo?.data?.documents?.[0].location);
      setAddress(userInfo?.data?.documents?.[0].address);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentUser = await getUser(user?.$id);

    if (!currentUser.status) return toast.error(currentUser.message);

    const res = await updateLocation({
      id: currentUser.data?.documents?.[0].$id!,
      data: { location, address },
    });

    if (!loadingLocation && !res.status) {
      return toast.error(res.message);
    }

    return toast.success(res.message);
  };

  if (loading && !userInfo) {
    return <Loader2Icon size={24} className="text-primary animate-spin" />;
  }

  if (error) {
    return (
      <p className="text-sm text-dark-300 truncate line-clamp-1">
        Failed to get user location.
      </p>
    );
  }

  return (
    <>
      <p className="flex-1 text-sm text-dark-300 font-medium truncate line-clamp-1 flex items-center gap-1">
        <MapPinIcon size={16} className="shrink-0 text-dark-300" />
        {userInfo?.data?.documents?.[0].address},{" "}
        {userInfo?.data?.documents?.[0].location}
      </p>
      <ChevronDownIcon
        size={16}
        onClick={toggleDropdown}
        className={cn(
          "text-dark-300 transition-transform transform-gpu duration-300",
          {
            "rotate-180": showDropdown,
          }
        )}
      />
      <ProfileDropdown>
        <div className="w-full mb-2">
          <p className="text-base font-medium">
            Update your delivery location.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-1">
          <CustomInput
            label="Location"
            type="text"
            name="location"
            value={location}
            onChange={setLocation}
          />
          <CustomInput
            label="Address"
            type="text"
            name="address"
            value={address}
            onChange={setAddress}
          />

          <SubmitButton label="Update location" />
        </form>
      </ProfileDropdown>
    </>
  );
};

export default LocationDropdown;
