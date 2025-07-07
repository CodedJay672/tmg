import { BellIcon, ChevronLeftIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { getCurrentUser } from "@/lib/data/user/getLoggedInUser";
import SearchBar from "../SearchBar";

const Header = async () => {
  const currentUser = await getCurrentUser();

  return (
    <header className="w-full bg-gray-50 sticky top-0 left-0 z-10 pb-6">
      <div className="flex-between px-1 lg:px-4">
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
        <div className="w-full flex-between lg:py-3">
          <div className="hidden lg:flex w-full max-w-screen-sm bg-foreground">
            <SearchBar placeholder="Search..." />
          </div>
          <div className="w-full p-2 flex items-center gap-2 rounded-full justify-end">
            <Button
              variant="outline"
              className="size-11 rounded-md p-2 bg-foreground border-primary/50"
            >
              <BellIcon size={24} className="text-primary" />
            </Button>
            <Button
              variant="outline"
              className="size-11 rounded-md p-2 bg-foreground border-primary/50"
            >
              <MailIcon size={24} className="text-primary" />
            </Button>

            {/* user profile */}
            <Link
              href={`/user/${currentUser?.documents?.[0].accountId}`}
              className="flex items-center gap-2 bg-foreground p-1.5 lg:pr-3 rounded-md border border-primary/50"
            >
              {currentUser?.documents?.[0].imgUrl ? (
                <Image
                  src={currentUser?.documents?.[0].imgUrl}
                  alt={currentUser?.documents?.[0].fullname}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="size-8 p-2 flex-center bg-primary rounded-full">
                  <span>{currentUser?.documents?.[0].fullname[0]}</span>
                </div>
              )}
              <div className="hidden lg:block">
                <h2 className="text-base font-semibold leading-4">
                  {currentUser?.documents?.[0].fullname}
                </h2>
                <p className="text-sm font-thin leading-4">
                  {currentUser?.documents?.[0].email}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:hidden w-full bg-foreground">
        <SearchBar placeholder="Search..." />
      </div>
    </header>
  );
};

export default Header;
