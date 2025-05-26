import React from "react";
import {
  LayoutDashboardIcon,
  ListOrderedIcon,
  SettingsIcon,
  ShoppingBagIcon,
  Users2Icon,
} from "lucide-react";
import Link from "next/link";
import AdminLink from "./shared/AdminLink";
import Image from "next/image";

const AdminNavLinks = () => {
  return (
    <nav className="w-full lg:w-72 lg:h-screen px-4 py-6 lg:p-0 flex justify-between items-center  flex-row lg:flex-col lg:justify-start lg:items-start bg-dark-100 sticky bottom-0 order-1 lg:order-0 lg:top-0 left-0 space-y-3 z-10">
      <Link href="/" className="hidden lg:flex items-center px-6">
        <Image
          src="/assets/logo.png"
          alt="tmg procurement"
          width={120}
          height={90}
        />
      </Link>

      <AdminLink
        path="/dashboard"
        label="Dashboard"
        icon={<LayoutDashboardIcon size={24} />}
      />

      <AdminLink
        path="/dashboard/customers"
        label="Customers"
        icon={<Users2Icon size={24} />}
      />

      <AdminLink
        path="/dashboard/products"
        label="Products"
        icon={<ListOrderedIcon size={24} />}
      />

      <AdminLink
        path="/dashboard/orders"
        label="All Orders"
        icon={<ShoppingBagIcon size={24} />}
      />

      <AdminLink
        path="/dashboard/settings"
        label="Settings"
        icon={<SettingsIcon size={24} />}
      />

      <p className="text-sm text-gray-400 hidden lg:block absolute bottom-2 left-6">
        Copyright &copy; since {new Date().getFullYear()}
      </p>
    </nav>
  );
};

export default AdminNavLinks;
