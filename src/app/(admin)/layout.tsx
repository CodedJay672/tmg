import AdminNavLinks from "@/components/AdminNavLinks";
import React from "react";

const AdminLayout = ({
  modal,
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <main className="w-full flex flex-col lg:flex-row gap-4">
      <AdminNavLinks />
      {children}
      {modal}
    </main>
  );
};

export default AdminLayout;
