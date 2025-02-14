import React from "react";
import ProductForm from "../../components/admin/ProductForm";

export default function AddProduct() {
  return (
    <>
      <div className="p-10 space-y-10">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Add Product</h2>
          <h3 className="text-sm text-gray-400">
            Please fill in the information below to add a new product.
          </h3>
        </div>

        <ProductForm />
      </div>
    </>
  );
}
