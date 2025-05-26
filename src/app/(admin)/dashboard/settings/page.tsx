import AdminLocationSetting from "@/components/shared/AdminLocationSetting";
import React from "react";

const Settings = () => {
  return (
    <section className="dashboard-container">
      <h2 className="admin-title">System settings</h2>
      <AdminLocationSetting />
    </section>
  );
};

export default Settings;
