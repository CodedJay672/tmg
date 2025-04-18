import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="w-full">{children}</main>;
};

export default AuthLayout;
