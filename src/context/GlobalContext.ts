"use client";

import { createContext } from "react";

const GlobalContext = createContext({
  showProfileMenu: false,
  toggleProfileMenu: () => {},
  showDropdown: false,
  toggleDropdown: () => {},
});

export default GlobalContext;
