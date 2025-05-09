import AdminNavLinks from "@/components/AdminNavLinks";
import Header from "@/components/shared/Header";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full flex flex-col lg:flex-row gap-4">
      <AdminNavLinks />
      <section className="flex-1 space-y-md">
        <Header />
        {children}
      </section>
    </main>
  );
};

export default AdminLayout;
