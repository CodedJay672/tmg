import React from "react";
import {
  FileAxis3DIcon,
  LayoutDashboardIcon,
  ListOrderedIcon,
  ShoppingBagIcon,
  Users2Icon,
} from "lucide-react";
import Link from "next/link";
import AdminLink from "./shared/AdminLink";
import Image from "next/image";

const AdminNavLinks = () => {
  return (
    <nav className="w-full lg:w-72 lg:h-screen px-4 py-6 lg:p-0 flex justify-between items-center  flex-row lg:flex-col lg:justify-start lg:items-start bg-dark-100 sticky bottom-0 order-1 lg:order-0 lg:top-0 left-0 space-y-3">
      <Link href="/" className="flex items-center px-6">
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
        path="/dashboard/users"
        label="Users"
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
        path="/dashboard/invoices"
        label="Invoices"
        icon={<FileAxis3DIcon size={24} />}
      />

      <p className="text-sm text-gray-400 hidden lg:block absolute bottom-2 left-6">
        Copyright &copy; since {new Date().getFullYear()}
      </p>
    </nav>
  );
};

export default AdminNavLinks;
