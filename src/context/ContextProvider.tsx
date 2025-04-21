"use client";

import React, { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import { useWindowScroll } from "react-use";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const { y } = useWindowScroll();

  //perform some options onscroll
  useEffect(() => {
    if (showDropdown) setShowDropdown(false);
  }, [y]);

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleEditDetails = () => {
    setEditDetails((prev) => !prev);
  };

  return (
    <GlobalContext.Provider
      value={{
        showProfileMenu,
        toggleProfileMenu,
        showDropdown,
        toggleDropdown,
        editDetails,
        handleEditDetails,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
