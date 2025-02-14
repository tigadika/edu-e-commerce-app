import React, { useEffect, useState } from "react";
import ProductForm from "../../components/admin/ProductForm";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function EditProduct() {
  const { id } = useParams();

  const [productById, setProductById] = useState(null);

  const getProductById = async () => {
    try {
      const docSnap = await getDoc(doc(db, "products", id));

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setProductById(docSnap.data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getProductById();
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
