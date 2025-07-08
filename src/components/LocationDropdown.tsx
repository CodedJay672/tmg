"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, MapPinIcon } from "lucide-react";
import { Models } from "node-appwrite";
import React, { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { toast } from "sonner";
import { Button } from "./ui/button";
import DeliveryDetailsForm from "./shared/DeliveryDetailsForm";
import { updateUserInfo } from "@/lib/actions/user.actions";
import { useStore } from "@/store/appStore";

const LocationDropdown = ({ user }: { user: Models.Document | undefined }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { clearCart } = useStore();
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  // handle the update action here
  const handleSubmit = async (formData: FormData) => {
    // set error to null and clear the cart
    setErrors(null);
    clearCart();

    const data = Object.fromEntries(formData);
    const res = await updateUserInfo(
      {
        data,
      },
      user?.$id
    );

    if (!res.status) {
      if (res.data) setErrors(res.data);
      toast.error(res.message);
      return res.message;
    }

    setShowDropdown(false);
    toast.success(res.message);
    return res.message;
  };

  return (
    <>
      <p className="flex-1  text-xs lg:text-sm text-dark-300 font-medium truncate line-clamp-1 flex items-center gap-1">
        <MapPinIcon size={16} className="shrink-0 text-dark-300" />
        {user?.delivery_location
          ? `${user?.delivery_location}, ${user?.delivery_address}`
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
        <p className=" text-base leading-5 lg:leading-7 font-semibold">
          Provide delivery information.
        </p>

        <DeliveryDetailsForm
          user={user}
          errors={errors}
          action={handleSubmit}
        />
      </ProfileDropdown>
    </>
  );
};

export default LocationDropdown;
