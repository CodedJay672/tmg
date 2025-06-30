import CustomersTable from "@/components/shared/table/customers/CustomersTable";
import { PlusIcon, UploadIcon } from "lucide-react";
import React from "react";

const Customers = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;

  return (
    <section className="dashboard-container">
      <div className="flex-between mb-5">
        <h1 className="admin-title">Customers</h1>
        <div className="flex items-center gap-3">
          <div className="py-1 px-2 text-primary border border-primary rounded-md flex-center gap-1">
            <UploadIcon size={20} className="text-primary" />
            <span className="hidden lg:inline-block text-base font-medium">
              Export
            </span>
          </div>
          <div className="py-1 px-2 bg-primary text-foreground rounded-md flex-center gap-2">
            <PlusIcon size={20} className="text-foreground" />
            <span className="hidden lg:inline-block text-base font-medium">
              Add Customer
            </span>
          </div>
        </div>
      </div>

      <CustomersTable query={query} />
    </section>
  );
};

export default Customers;
