import React from "react";
import CategoryLink from "./shared/CategoryLink";

const CategoryTab = () => {
  return (
    <div className="w-full  my-6">
      <h2 className="hidden lg:block text-xl mb-4">Top Categories</h2>
      <div className="w-full  flex items-center gap-1 lg:gap-6 my-3 lg:my-0 overflow-x-scroll no-scrollbar">
        <CategoryLink img="/assets/tools.jpg" title="All" />
        <CategoryLink img="/assets/rods.jpg" title="Trending" />
        <CategoryLink img="/assets/rods.jpg" title="Mechanical" />
        <CategoryLink img="/assets/grinder.jpg" title="Steel" />
        <CategoryLink img="/assets/tools.jpg" title="Electrical" />
      </div>

      <div className="w-full hidden lg:block mt-6">
        <h2 className="text-xl">Trending products</h2>
        {/** Trending products here */}
      </div>
    </div>
  );
};

export default CategoryTab;
