import {
  FileAxis3DIcon,
  LayoutDashboardIcon,
  ListOrderedIcon,
  ShoppingBagIcon,
  Users2Icon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import AdminLink from "./shared/AdminLink";

const AdminNavLinks = () => {
  return (
    <nav className="w-full lg:w-72 lg:h-screen px-4 py-6 lg:p-0 flex justify-between items-center  flex-row lg:flex-col lg:justify-start lg:items-start bg-dark-100 sticky bottom-0 order-1 lg:order-0 lg:top-0 left-0 space-y-3">
      <div className="w-full hidden lg:flex items-center p-6">
        <Link
          href="/"
          className="text-3xl font-bold text-foreground lg:text-background flex gap-1"
        >
          <div className="size-10  bg-secondary rounded-full" />
          TGM
        </Link>
      </div>

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
