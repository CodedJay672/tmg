"use client";

import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  return (
    <GlobalContext.Provider
      value={{
        showProfileMenu,
        toggleProfileMenu,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
