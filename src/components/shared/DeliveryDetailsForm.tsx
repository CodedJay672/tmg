"use client";

import { useGetUserById } from "@/lib/queries/userQueried/users";
import { Models } from "node-appwrite";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import SubmitButton from "./SubmitButton";

const DeliveryDetailsForm = ({
  user,
  action,
  errors,
}: {
  user: Models.User<Models.Preferences>;
  errors: Record<string, string[]> | null;
  action: (t: FormData) => Promise<string | undefined>;
}) => {
  const { data: userInfo } = useGetUserById(user.$id);

  // get all delivery details from the database
  const [deliveryLocation, setDeliveryLocation] = useState(
    userInfo?.data?.documents?.[0].delivery_location ?? ""
  );
  const [deliveryAddress, setDeliveryAddress] = useState(
    userInfo?.data?.documents?.[0].delivery_address ?? ""
  );
  const [receiverName, setReceiverName] = useState(
    userInfo?.data?.documents?.[0].receiver_name ?? ""
  );
  const [receiverPhone, setReceiverPhone] = useState(
    userInfo?.data?.documents?.[0].receiver_phone ?? ""
  );

  // Handler to adapt FormEvent to FormData for the action prop
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await action(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 mb-4">
      <CustomInput
        label="Location"
        type="text"
        name="delivery_location"
        value={deliveryLocation}
        onChange={setDeliveryLocation}
        error={errors?.["delivery_location"]}
      />
      <CustomInput
        label="Address"
        type="text"
        name="delivery_address"
        value={deliveryAddress}
        onChange={setDeliveryAddress}
        error={errors?.["delivery_address"]}
      />
      <CustomInput
        label="Name (Receiver)"
        type="text"
        name="receiver_name"
        value={receiverName}
        error={errors?.["receiver_name"]}
        onChange={setReceiverName}
      />
      <CustomInput
        label="Phone (Receiver)"
        type="text"
        name="receiver_phone"
        value={receiverPhone}
        onChange={setReceiverPhone}
        error={errors?.["receiver_phone"]}
      />

      <SubmitButton label="Update" />
      <small className="w-full text-center text-dark-200 mt-4">
        Note! This will become your{" "}
        <span className="font-bold text-secondary">
          default delivery location.
        </span>
      </small>
    </form>
  );
};

export default DeliveryDetailsForm;
