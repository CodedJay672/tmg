import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="w-full">{children}</main>;
};

export default AdminLayout;
