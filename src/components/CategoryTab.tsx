import React from "react";
import CategoryLink from "./shared/CategoryLink";
import CustomTab from "./shared/CustomTab";

const CategoryTab = () => {
  return (
    <div className="w-full max-w-5xl lg:mx-auto  mt-6 mb-2 lg:my-6 lg:p-10 lg:bg-dark-100/50 rounded-xl">
      <h2 className="hidden lg:block text-4xl text-center font-medium mb-4">
        Top Categories
      </h2>

      {/* desktop categories */}
      <div className="hidden w-full lg:flex items-center justify-center gap-1 lg:gap-10 lg:my-1 overflow-x-scroll no-scrollbar">
        <CategoryLink img="/assets/tools.jpg" title="All" />
        <CategoryLink img="/assets/rods.jpg" title="Trending" />
        <CategoryLink img="/assets/rods.jpg" title="Mechanical" />
        <CategoryLink img="/assets/grinder.jpg" title="Steel" />
        <CategoryLink img="/assets/tools.jpg" title="Electrical" />
      </div>

      {/* Mobile tabs for category */}
      <div className="flex-1 flex items-center space-x-4 lg:hidden">
        <CustomTab name="admin" title="all" />
        <CustomTab name="admin" title="mechanical" />
        <CustomTab name="admin" title="steel" />
        <CustomTab name="admin" title="electrical" />
      </div>
    </div>
  );
};

export default CategoryTab;
