"use client";

import React, { createContext } from "react";

const GlobalContext = createContext({
  showProfileMenu: false,
  toggleProfileMenu: () => {},
  showDropdown: false,
  toggleDropdown: () => {},
  editDetails: false,
  handleEditDetails: () => {},
  category: "",
  changeCategory: (t: string) => {},
});

export default GlobalContext;
