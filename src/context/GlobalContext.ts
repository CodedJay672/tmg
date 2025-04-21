"use client";

import { createContext } from "react";

const GlobalContext = createContext({
  showProfileMenu: false,
  toggleProfileMenu: () => {},
  showDropdown: false,
  toggleDropdown: () => {},
  editDetails: false,
  handleEditDetails: () => {},
});

export default GlobalContext;
