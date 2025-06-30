import AdminNavLinks from "@/components/AdminNavLinks";
import Header from "@/components/shared/Header";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full flex flex-col lg:flex-row gap-6">
      <AdminNavLinks />
      <section className="w-full space-y-md p-1 lg:p-6 dashboard-container">
        <Header />
        {children}
      </section>
    </main>
  );
};

export default AdminLayout;
