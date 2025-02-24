import React, { useEffect } from "react";
import ProductForm from "../../components/admin/ProductForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductByIdThunk } from "../../store/appSlice";

export default function EditProduct() {
  const { id } = useParams();
  const { productById } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getProductByIdThunk(id));
    }
  }, [id]);

  return (
    <>
      <div className="p-10 space-y-10">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Edit Product 1</h2>
          <h3 className="text-sm text-gray-400">
            You can change product information here.
          </h3>
        </div>

        <ProductForm productById={productById} productId={id} />
      </div>
    </>
  );
}
