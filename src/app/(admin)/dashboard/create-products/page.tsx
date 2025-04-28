import ProductForm from "@/components/ProductForm";
import React from "react";

const CreateProducts = () => {
  return (
    <section className="dashboard-container">
      <h2 className="text-lg lg:text-xl font-medium">Add Products</h2>
      <p className="text-sm lg:text-base text-dark-300">
        Please enter the products details
      </p>

      <ProductForm />
    </section>
  );
};

export default CreateProducts;
