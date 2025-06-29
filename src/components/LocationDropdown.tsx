"use client";

import {
  useGetUserById,
  useUpdateUserInfo,
} from "@/lib/queries/userQueried/users";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, Loader2Icon, MapPinIcon } from "lucide-react";
import { Models } from "node-appwrite";
import React, { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { toast } from "sonner";
import { getUser } from "@/lib/actions/user.actions";
import { Button } from "./ui/button";
import DeliveryDetailsForm from "./shared/DeliveryDetailsForm";

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
  const { mutateAsync: updateLocation, isPending: loadingLocation } =
    useUpdateUserInfo();
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  // handle the update action here
  const handleSubmit = async (formData: FormData) => {
    setErrors(null);
    const currentUser = await getUser(user?.$id);

    if (!currentUser.status) {
      toast.error(currentUser.message);
      return currentUser.message;
    }

    const delivery_address = formData.get("delivery_address") as string;
    const delivery_location = formData.get("delivery_location") as string;
    const receiver_name = formData.get("receiver_name") as string;
    const receiver_phone = formData.get("receiver_phone") as string;

    const res = await updateLocation({
      id: currentUser.data?.documents?.[0].$id as string,
      data: {
        delivery_address,
        delivery_location,
        receiver_name,
        receiver_phone,
      },
    });

    if (!loadingLocation && !res.status) {
      if (res.data) setErrors(res.data);
      toast.error(res.message);
      console.log(res);
      return res.message;
    }

    setShowDropdown(false);
    toast.success(res.message);
    return res.message;
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
      <p className="flex-1  text-xs lg:text-sm text-dark-300 font-medium truncate line-clamp-1 flex items-center gap-1">
        <MapPinIcon size={16} className="shrink-0 text-dark-300" />
        {userInfo.data?.documents?.[0].delivery_location
          ? `${userInfo.data.documents?.[0].delivery_location}, ${userInfo.data.documents?.[0].delivery_address}`
          : "Set delivery location."}
      </p>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowDropdown((prev) => !prev)}
        className="cursor-pointer"
      >
        <ChevronDownIcon
          size={16}
          className={cn(
            "text-dark-300 transition-transform transform-gpu duration-300",
            {
              "rotate-180": showDropdown,
            }
          )}
        />
      </Button>
      <ProfileDropdown show={showDropdown} setShow={setShowDropdown}>
        <div className="w-xs lg:w-max overflow-hidden">
          <div className="w-full mb-6 mt-4">
            <p className="text-xl font-bold">Provide delivery information.</p>
          </div>

          <DeliveryDetailsForm
            user={user}
            errors={errors}
            action={handleSubmit}
          />
        </div>
      </ProfileDropdown>
    </>
  );
};

export default LocationDropdown;
