"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../Modal";
import {
  useGetAllLocations,
  useUpdateLocation,
} from "@/lib/queries/locationQueries/location";
import { toast } from "sonner";
import SubmitButton from "./SubmitButton";
import { AppwriteException } from "node-appwrite";

const AdminLocationSetting = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: locationsInfo } = useGetAllLocations();
  const { mutateAsync: updateLocation } = useUpdateLocation();

  const [location, setLocation] = useState(
    locationsInfo?.data?.documents?.[0].location ?? ""
  );
  const [charge, setCharge] = useState(
    locationsInfo?.data?.documents?.[0].charge ?? ""
  );

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await updateLocation({
        id: locationsInfo?.data?.documents?.[0].$id,
        charge: charge,
      });

      if (!response.status) return toast.error(response.message);

      toast.success(response.message);
    } catch (error) {
      if (error instanceof AppwriteException) toast.error(error.message);
      throw error;
    }
  };

  return (
    <div className="w-full my-6">
      <Button variant="link" onClick={() => setShowModal(true)}>
        Click here to set location charges.
      </Button>

      <Modal open={showModal} onOpenChange={setShowModal}>
        <form onSubmit={handleUpdate} className="w-full space-y-6">
          <label className="text-lg font-medium block">
            Location
            <select
              defaultValue={location.location || "Select a state"}
              required
              onChange={(e) => setLocation(e.target.value)}
              className="text-base font-medium capitalize w-full bg-dark-100 border border-primary rounded-lg p-3 mt-4 outline-none"
            >
              {locationsInfo?.data?.documents.map((item) => (
                <option
                  value={item.location}
                  key={item.$id}
                  className="text-base capitalize"
                >
                  {item.location}
                </option>
              ))}
            </select>
          </label>

          <label className=" text-lg font-medium block mb-6">
            Charge (%)
            <input
              type="number"
              defaultValue={charge}
              required
              onChange={(e) => setCharge(e.target.value)}
              className="w-full bg-dark-100 border border-primary rounded-lg outline-none p-2 mt-3"
            />
          </label>
          <SubmitButton label="Update" />
        </form>
      </Modal>
    </div>
  );
};

export default AdminLocationSetting;
