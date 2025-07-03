import { customerTable } from "@/components/shared/table/columns";
import CustomTable from "@/components/shared/table/CustomTable";
import { getUser } from "@/lib/data/user/getLoggedInUser";
import { PlusIcon, UploadIcon } from "lucide-react";
import React from "react";

const Customers = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;
  const users = await getUser();

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

      {query && (
        <p className="text-base font-medium mt-10">
          Search result for: <span className="text-primary">{query}</span>
        </p>
      )}
      <CustomTable
        columns={customerTable}
        data={users?.data?.documents ?? []}
      />
    </section>
  );
};

export default Customers;
