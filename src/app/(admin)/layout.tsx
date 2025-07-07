import AdminNavLinks from "@/components/AdminNavLinks";
import Header from "@/components/shared/Header";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full flex flex-col lg:flex-row">
      <AdminNavLinks />
      <section className="w-full">
        <Header />
        {children}
      </section>
    </main>
  );
};

export default AdminLayout;
