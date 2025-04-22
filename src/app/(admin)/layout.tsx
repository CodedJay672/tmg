import AdminNavLinks from "@/components/AdminNavLinks";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full flex flex-col lg:flex-row gap-4">
      <AdminNavLinks />
      {children}
    </main>
  );
};

export default AdminLayout;
