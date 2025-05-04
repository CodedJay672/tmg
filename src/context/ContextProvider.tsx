"use client";

import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [category, setCategory] = useState("all");

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleEditDetails = () => {
    setEditDetails((prev) => !prev);
  };

  const changeCategory = (text: string) => {
    setCategory(text.toLowerCase());
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
        category,
        changeCategory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
