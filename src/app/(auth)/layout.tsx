import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-h-screen py-10 flex-center bg-dark-100">
      {children}
    </main>
  );
};

export default AuthLayout;
