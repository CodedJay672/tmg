import React from "react";
import CategoryLink from "./shared/CategoryLink";

const CategoryTab = () => {
  return (
    <div className="w-full  mt-6 mb-2 lg:my-6">
      <h2 className="hidden lg:block text-xl mb-4">Top Categories</h2>
      <div className="w-full  flex items-center gap-1 lg:gap-6 lg:my-0 overflow-x-scroll no-scrollbar">
        <CategoryLink img="/assets/tools.jpg" title="All" />
        <CategoryLink img="/assets/rods.jpg" title="Trending" />
        <CategoryLink img="/assets/rods.jpg" title="Mechanical" />
        <CategoryLink img="/assets/grinder.jpg" title="Steel" />
        <CategoryLink img="/assets/tools.jpg" title="Electrical" />
      </div>
    </div>
  );
};

export default CategoryTab;
