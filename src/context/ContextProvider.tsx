"use client";

import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  }

  return (
    <GlobalContext.Provider
      value={{
        showProfileMenu,
        toggleProfileMenu,
        showDropdown,
        toggleDropdown,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
