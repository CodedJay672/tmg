import { BellIcon, ChevronLeftIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "../SearchBar";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { getUser } from "@/lib/actions/user.actions";

const Header = async () => {
  const user = await getLoggedInUser();

  const currentUser = await getUser(user?.$id);

  return (
    <header className="w-full px-3 lg:px-6 sticky top-0 left-0 bg-foreground pb-2 mb-4 z-10">
      <div className="flex-between">
        <Link href="/" className="flex items-center lg:hidden">
          <ChevronLeftIcon size={24} className="text-dark-300" />
          <Image
            src="/assets/logo.png"
            alt="tmg procurement"
            width={120}
            height={90}
            className="shrink-0 object-contain"
          />
        </Link>
        <div className="w-full flex-between space-x-1 lg:py-3">
          <div className="hidden lg:flex w-full max-w-screen-sm">
            <SearchBar placeholder="Search..." />
          </div>
          <div className="w-full p-2 flex items-center gap-7 rounded-full justify-end">
            <BellIcon size={24} className="text-primary" />
            <MailIcon size={24} className="text-primary" />

            {/* user profile */}
            <Link
              href={`/user/${user?.$id}`}
              className="flex items-center gap-2"
            >
              {currentUser.data?.documents?.[0].imgUrl ? (
                <Image
                  src={currentUser?.data?.documents?.[0].imgUrl}
                  alt={currentUser?.data?.documents?.[0].fullname}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="size-8 p-2 flex-center bg-primary rounded-full">
                  <span>{currentUser?.data?.documents?.[0].fullname[0]}</span>
                </div>
              )}
              <div className="hidden lg:block">
                <h2 className="text-base font-semibold">
                  {currentUser?.data?.documents?.[0].fullname}
                </h2>
                <p className="text-sm font-thin">
                  {currentUser?.data?.documents?.[0].email}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:hidden w-full bg-dark-200/20">
        <SearchBar placeholder="Search..." />
      </div>
    </header>
  );
};

export default Header;
