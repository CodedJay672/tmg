"use client";

import { useGetUserById } from "@/lib/queries/userQueried/users";
import { Loader2Icon } from "lucide-react";
import CustomTable from "../CustomTable";
import { customerTable } from "../columns";
import { useEffect, useState } from "react";

const CustomersTable = ({ query }: { query: string }) => {
  const [client, setClient] = useState(false);
  const { data: users, isPending: loading } = useGetUserById();

  useEffect(() => {
    if (!client) return;

    setClient(true);
  }, []);

  return (
    <>
      {loading ? (
        <Loader2Icon
          size={24}
          className="text-primary animate-spin mx-auto mt-10"
        />
      ) : (
        <>
          {query && (
            <p className="text-base font-medium mt-10">
              Search result for: <span className="text-primary">{query}</span>
            </p>
          )}
          <CustomTable
            columns={customerTable}
            data={users?.data?.documents ?? []}
          />
        </>
      )}
    </>
  );
};

export default CustomersTable;
