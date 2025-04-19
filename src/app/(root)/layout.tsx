import BottomBar from "@/components/BottomBar";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full">
      <Topbar />
      {children}
      <BottomBar />
      <Footer />
    </main>
  );
};

export default HomeLayout;
