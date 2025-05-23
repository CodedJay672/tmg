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
import CustomInput from "./shared/CustomInput";
import SubmitButton from "./shared/SubmitButton";
import { toast } from "sonner";
import { getUser } from "@/lib/actions/user.actions";
import { Button } from "./ui/button";

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

  // get all delivery details from the database
  const [deliveryLocation, setDeliveryLocation] = useState(
    userInfo?.data?.documents?.[0].delivery_location
  );
  const [deliveryAddress, setDeliveryAddress] = useState(
    userInfo?.data?.documents?.[0].delivery_address
  );
  const [receiverName, setReceiverName] = useState(
    userInfo?.data?.documents?.[0].receiver_name
  );
  const [receiverPhone, setReceiverPhone] = useState(
    userInfo?.data?.documents?.[0].receiver_phone
  );

  // handle the update action here
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentUser = await getUser(user?.$id);

    if (!currentUser.status) return toast.error(currentUser.message);

    const res = await updateLocation({
      id: currentUser.data?.documents?.[0].$id!,
      data: {
        delivery_address: deliveryAddress,
        delivery_location: deliveryLocation,
        receiver_name: receiverName,
        receiver_phone: receiverPhone,
      },
    });

    if (!loadingLocation && !res.status) {
      return toast.error(res.message);
    }

    setShowDropdown(false);
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
        {userInfo.data?.total
          ? `${userInfo.data.documents?.[0].delivery_location}, ${userInfo.data.documents?.[0].delivery_address}`
          : "Set location here."}
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
        <div className="w-full overflow-hidden">
          <div className="w-full mb-6 mt-4">
            <p className="text-xl font-bold">Provide delivery information.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-3 mb-4"
          >
            <CustomInput
              label="Location"
              type="text"
              name="delivery_location"
              value={deliveryLocation}
              onChange={setDeliveryLocation}
            />
            <CustomInput
              label="Address"
              type="text"
              name="delivery_address"
              value={deliveryAddress}
              onChange={setDeliveryAddress}
            />
            <CustomInput
              label="Name (Receiver)"
              type="text"
              name="receiver_name"
              value={receiverName}
              onChange={setReceiverName}
            />
            <CustomInput
              label="Phone (Receiver)"
              type="text"
              name="receiver_phone"
              value={receiverPhone}
              onChange={setReceiverPhone}
            />

            <SubmitButton label="Update" />
            <small className="w-full text-center text-dark-200 mt-4">
              Note! This will become your{" "}
              <span className="font-bold text-secondary">
                default delivery location.
              </span>
            </small>
          </form>
        </div>
      </ProfileDropdown>
    </>
  );
};

export default LocationDropdown;
