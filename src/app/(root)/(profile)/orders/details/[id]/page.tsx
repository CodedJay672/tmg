import Back from "@/components/shared/Back";
import { getTransaction } from "@/lib/actions/cart.actions";
import { formatDate } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import React from "react";

const OderDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const orderInfo = await getTransaction(id);

  if (!orderInfo.status) {
    return (
      <Loader2Icon size={24} className="text-primary animate-spin mx-auto" />
    );
  }

  console.log(orderInfo.data?.documents?.[0].order);

  const date = formatDate(orderInfo.data?.documents?.[0].$createdAt as string);

  return (
    <section className="content-wrapper space-y-6">
      <div className="w-full px-3 py-5 border flex gap-3 border-gray-200 rounded-xl space-y-3">
        <div className="flex-center border rounded-xl border-dark-200">
          <Back />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-stretch-200% lg:text-xl font-medium">
              #{id}
            </h1>
            <span
              className={`text-xs py-1 px-3 border inline-block rounded-lg font-semibold ${
                orderInfo.data?.documents?.[0].status === "PROCESSING"
                  ? "border-amber-500 text-amber-500"
                  : orderInfo.data?.documents?.[0].status === "COMPLETE"
                  ? "border-green-500 text-green-500"
                  : "border-red-500 text-red-500"
              }`}
            >
              {orderInfo.data?.documents?.[0].status}
            </span>
          </div>
          <div className="w-full flex items-center">
            <span className="text-dark-200 text-xs lg:text-sm font-medium">
              Order / Order details / #{id} - {date as string}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full p-3 border border-gray-200 rounded-xl">
        <h2 className="text-lg lg:text-xl font-medium">Products</h2>
      </div>
    </section>
  );
};

export default OderDetails;
