import React from "react";
import CategoryLink from "./shared/CategoryLink";

const CategoryTab = () => {
  return (
    <div className="w-full max-w-5xl lg:mx-auto  mt-6 mb-2 lg:my-6 lg:p-10 lg:bg-dark-100/50 rounded-xl">
      <h2 className="hidden lg:block text-4xl mb-4 text-center font-medium mb-4">
        Top Categories
      </h2>
      <div className="w-full  flex items-center lg:justify-center gap-1 lg:gap-10 lg:my-1 overflow-x-scroll no-scrollbar">
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
