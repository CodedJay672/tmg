import BottomBar from "@/components/BottomBar";
import Topbar from "@/components/Topbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full">
      <Topbar />
      {children}
      <BottomBar />
      {/* <Footer /> */}
    </main>
  );
};

export default HomeLayout;
