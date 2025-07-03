import AdminLocationSetting from "@/components/shared/AdminLocationSetting";
import { getAllLocations } from "@/lib/data/locations/locations.data";
import React from "react";

const Settings = async () => {
  const locations = await getAllLocations();

  return (
    <section className="dashboard-container">
      <h2 className="admin-title">System settings</h2>
      <AdminLocationSetting locations={locations.data?.documents} />
    </section>
  );
};

export default Settings;
