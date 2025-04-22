import {
  HomeIcon,
  SearchIcon,
  ShoppingCartIcon,
  User2Icon,
} from "lucide-react";
import React from "react";
import MobileLink from "./shared/MobileLink";
import { getLoggedInUser } from "@/lib/server/appwrite";

const BottomBarLinks: BottomBarProps[] = [
  {
    path: "/",
    icon: <HomeIcon size={24} />,
  },
  {
    path: "/search",
    icon: <SearchIcon size={24} />,
  },
  {
    path: "/cart",
    icon: <ShoppingCartIcon size={24} />,
  },
];

const BottomBar = async () => {
  const user = await getLoggedInUser();

  return (
    <section className="w-full flex justify-between items-center lg:hidden bg-dark-100 p-4 sticky bottom-0 left-0 z-90">
      {BottomBarLinks.map((link, idx) => (
        <MobileLink key={idx} path={link.path} icon={link.icon} />
      ))}
      <MobileLink path={`/user/${user?.$id}`} icon={<User2Icon size={24} />} />
    </section>
  );
};

export default BottomBar;
