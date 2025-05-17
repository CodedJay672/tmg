"use client";

import { Models } from "node-appwrite";
import React, { useContext, useRef, useState } from "react";
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
      };

      const res = await updateUserInfo({ data }, user?.$id, userFile?.[0]);

      if (!res.status) {
        if (res.data) setErrors(res.data);
        return toast.error(res.message);
      }

      return toast.success(res.message);
    } catch (error: any) {
      if (error.data) setErrors(error.data);
      return toast.error(error.message);
    } finally {
      setEditDetails(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl space-y-4 lg:p-6 flex flex-col"
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
        />
        <CustomInput
          label="lastname"
          type="text"
          name="lastname"
          value={lastname}
          disabled={!editDetails}
          onChange={setLastname}
        />
      </fieldset>

      <CustomInput
        label="email"
        type="email"
        name="email"
        value={email}
        disabled={!editDetails}
        onChange={setEmail}
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
        />
        <CustomInput
          label="Phone"
          type="text"
          name="phone"
          value={phone}
          disabled={!editDetails}
          onChange={setPhone}
        />
      </fieldset>

      <CustomInput
        label="address"
        type="text"
        name="address"
        value={address}
        disabled={!editDetails}
        onChange={setAddress}
      />

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
