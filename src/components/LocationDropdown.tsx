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

const LocationDropdown = ({ user }: { user: Models.Document | undefined }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  // handle the update action here
  const handleSubmit = async (formData: FormData) => {
    setErrors(null);

    const data = Object.fromEntries(formData);

    const res = await updateUserInfo(
      {
        data,
      },
      user?.documents?.[0].$id as string
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
        <div className="w-full overflow-hidden relative  ">
          <div className="w-full mb-6 mt-4">
            <p className=" text-lg lg:text-xl font-bold">
              Provide delivery information.
            </p>
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
