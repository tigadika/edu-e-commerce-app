import React from "react";
import ProductForm from "../../components/admin/ProductForm";

export default function EditProduct() {
  return (
    <>
      <div className="p-10 space-y-10">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Edit Product 1</h2>
          <h3 className="text-sm text-gray-400">
            You can change product information here.
          </h3>
        </div>

        <ProductForm />
      </div>
    </>
  );
}
