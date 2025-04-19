"use client";

import { createContext } from "react";

const GlobalContext = createContext({
  showProfileMenu: false,
  toggleProfileMenu: () => {},
});

export default GlobalContext;
