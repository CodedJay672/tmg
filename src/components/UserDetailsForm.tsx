"use client";

import { AppwriteException, Models } from "node-appwrite";
import React, { useRef, useState } from "react";
import CustomInput from "./shared/CustomInput";
import Image from "next/image";
import SubmitButton from "./shared/SubmitButton";
import { Button } from "./ui/button";
import FileUploader from "./shared/FileUploader";
import { CameraIcon, PencilIcon } from "lucide-react";
import { toast } from "sonner";
import { updateUserInfo } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";

const UserDetailsForm = ({ user }: { user?: Models.Document }) => {
  const [editDetails, setEditDetails] = useState(false);
  const fileUploadRef = useRef<HTMLInputElement | null>(null);

  const [firstname, setFirstname] = useState(
    user?.fullname.split(" ")[0] || ""
  );
  const [lastname, setLastname] = useState(user?.fullname.split(" ")[1] || "");
  const [email, setEmail] = useState(user?.email || "");
  const [location, setLocation] = useState(user?.location || "");
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [imgUrl, setImgUrl] = useState(user?.imgUrl || "");
  const [userFile, setUserFile] = useState<File[]>([]);
  const [deliveryLocation, setDeliveryLocation] = useState(
    user?.delivery_location || ""
  );
  const [deliveryAddress, setDeliveryAddress] = useState(
    user?.delivery_address || ""
  );
  const [receiverPhone, setReceiverPhone] = useState(
    user?.receiver_phone || ""
  );
  const [receiverName, setReceiverName] = useState(user?.receiver_name || "");
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  const uploadFile = () => {
    if (!fileUploadRef.current) return;

    fileUploadRef.current.click();
    return;
  };

  // submit the updated form data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const fullname = `${firstname} ${lastname}`;

      const data = {
        fullname,
        email,
        location,
        address,
        phone,
        imgUrl,
        delivery_location: deliveryLocation,
        delivery_address: deliveryAddress,
        receiver_phone: receiverPhone,
        receiver_name: receiverName,
      };

      const res = await updateUserInfo({ data }, user?.$id, userFile?.[0]);

      if (!res.status) {
        if (res.data) setErrors(res.data);
        return toast.error(res.message);
      }

      return toast.success(res.message);
    } catch (error) {
      if (error instanceof AppwriteException) return toast.error(error.message);
      throw error;
    } finally {
      setEditDetails(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-2xl space-y-4 lg:p-6 flex flex-col"
    >
      <fieldset className="w-full flex justify-between">
        <div className="size-24 flex-center rounded-full bg-secondary relative">
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={user?.fullname}
              fill
              className="object-cover rounded-full overflow-hidden"
            />
          ) : (
            <h3 className="text-5xl font-bold text-primary">
              {user?.fullname[0]}
            </h3>
          )}

          {editDetails && (
            <>
              <div
                onClick={uploadFile}
                className="size-8 rounded-full absolute bottom-0 right-0 bg-dark-300 flex-center cursor-pointer"
              >
                <CameraIcon size={16} color="white" />
              </div>
              <div className="hidden">
                <FileUploader
                  setImgUrl={setImgUrl}
                  onChange={setUserFile}
                  ref={fileUploadRef}
                />
              </div>
            </>
          )}
        </div>
        <div
          onClick={() => setEditDetails((prev) => !prev)}
          className={cn(
            "size-10 text-dark-200 rounded-full border border-dark-200 flex-center cursor-pointer transition-all",
            {
              "bg-secondary text-dark-300": editDetails,
            }
          )}
        >
          <PencilIcon size={16} />
        </div>
      </fieldset>

      <fieldset className="flex-between gap-2 lg:gap-3">
        <CustomInput
          label="Firstname"
          type="text"
          name="firstname"
          value={firstname}
          disabled={!editDetails}
          onChange={setFirstname}
          error={errors?.["firstname"]}
        />
        <CustomInput
          label="lastname"
          type="text"
          name="lastname"
          value={lastname}
          disabled={!editDetails}
          onChange={setLastname}
          error={errors?.["lastname"]}
        />
      </fieldset>

      <CustomInput
        label="email"
        type="email"
        name="email"
        value={email}
        disabled={!editDetails}
        onChange={setEmail}
        error={errors?.["email"]}
      />

      <fieldset className="flex-between gap-2 lg:gap-3 mt-6 mb-2">
        <legend className="text-lg font-medium mb-3">Location details</legend>

        <CustomInput
          label="Location"
          type="text"
          name="location"
          value={location}
          disabled={!editDetails}
          onChange={setLocation}
          error={errors?.["location"]}
        />
        <CustomInput
          label="Phone"
          type="text"
          name="phone"
          value={phone}
          disabled={!editDetails}
          onChange={setPhone}
          error={errors?.["phone"]}
        />
      </fieldset>

      <CustomInput
        label="address"
        type="text"
        name="address"
        value={address}
        disabled={!editDetails}
        onChange={setAddress}
        error={errors?.["address"]}
      />

      <fieldset className="mt-5">
        <legend className="text-lg font-medium mb-3">Delivery details</legend>

        <div className="flex-between gap-2 lg:gap-3 mb-2">
          <CustomInput
            label="delivery Location"
            type="text"
            name="delivery_location"
            value={deliveryLocation}
            disabled={!editDetails}
            onChange={setDeliveryLocation}
            error={errors?.["delivery_location"]}
          />

          <CustomInput
            label="delivery address"
            type="text"
            name="delivery_address"
            value={deliveryAddress}
            disabled={!editDetails}
            onChange={setDeliveryAddress}
            error={errors?.["delivery_address"]}
          />
        </div>

        <div className="flex-between gap-2 lg:gap-3 mb-2">
          <CustomInput
            label="receiver's name"
            type="text"
            name="receiver_name"
            value={receiverName}
            disabled={!editDetails}
            onChange={setReceiverName}
            error={errors?.["receiver_name"]}
          />
          <CustomInput
            label="receiver's phone"
            type="text"
            name="receiver_phone"
            value={receiverPhone}
            disabled={!editDetails}
            onChange={setReceiverPhone}
            error={errors?.["receiver_phone"]}
          />
        </div>
      </fieldset>

      {editDetails && (
        <fieldset className="w-full lg:w-96 mt-6 grid grid-cols-2 gap-1 lg:gap-3 place-self-end place-content-center">
          <SubmitButton label="Submit" />
          <Button
            type="button"
            onClick={() => setEditDetails(false)}
            className="w-full rounded-lg mt-2 bg-red-500 text-foreground hover:bg-red-500 transition-all"
          >
            Cancel
          </Button>
        </fieldset>
      )}
    </form>
  );
};

export default UserDetailsForm;
