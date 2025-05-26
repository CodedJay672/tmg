"use client";

import { Models } from "node-appwrite";
import React from "react";

const CustomerDetails = ({ info }: { info: Models.Document }) => {
  return (
    <aside className="w-full space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl lg:text-3xl font-bold">{info.fullname}</h2>
        <p className="text-base font-medium text-dark-200">{info.email}</p>
      </div>

      <div className="w-full p-2 border border-dark-100 rounded-xl">
        <h2 className="text-lg font-bold">Location</h2>
        <p className="text-base font-light text-dark-300">
          {info.location ?? "No location info."}
        </p>
        <p className="text-base font-light text-dark-300">{info.address}</p>
        <p className="text-base font-light text-dark-300">
          {info.phone ?? "No phone number"}
        </p>
      </div>

      <div className="w-full p-2 border border-dark-100 rounded-xl">
        <h2 className="text-lg font-semibold mb-3">Billing Address</h2>
        <p className="text-base text-dark-300">
          Address:{" "}
          <span className="text-sm text-dark-300 font-medium">
            {info.delivery_address || "--"}
          </span>
        </p>
        <p className="text-base text-dark-300">
          Location:{" "}
          <span className="text-sm text-dark-300 font-medium">
            {info.delivery_location || "--"}
          </span>
        </p>
        <p className="text-base text-dark-300">
          Name:{" "}
          <span className="text-sm text-dark-300 font-medium">
            {info.receiver_name || "--"}
          </span>
        </p>
        <p className="text-base text-dark-300">
          Phone:{" "}
          <span className="text-sm text-dark-300 font-medium">
            {info.receiver_phone || "--"}
          </span>
        </p>
      </div>
    </aside>
  );
};

export default CustomerDetails;
