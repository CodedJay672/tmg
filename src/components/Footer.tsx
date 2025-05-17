import { getLoggedInUser } from "@/lib/server/appwrite";
import Link from "next/link";
import React from "react";

const Footer = async () => {
  const user = await getLoggedInUser();

  return (
    <footer className="hidden lg:block bg-black px-10 py-16 space-y-24">
      <div className="w-full max-w-screen-lg mx-auto">
        
        <h3 className="text-4xl font-medium text-foreground w-96">
          Stay in the loop with current market pricings
        </h3>
      </div>

      <div className="flex-between w-full max-w-screen-lg mx-auto mt-10">
        <div className="space-y-2">
          <h3 className="text-base text-foreground font-bold">Lagos</h3>
          <p className="text-base font-light text-dark-100">
            24 Bashiru shekoni str, Lagos, Nigeria
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base text-foreground font-bold">Quick links</h3>
          <ul>
            <li>
              <Link href={`/user/${user?.$id}`} className="text-dark-100">
                My account
              </Link>
            </li>
            <li>
              <Link href={`/orders/${user?.$id}`} className="text-dark-100">
                My orders
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-center border-t border-dark-200 p-4">
        <span className="text-sm text-dark-200">
          All rights reserved &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
