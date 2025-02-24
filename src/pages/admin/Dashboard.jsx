import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminLayout";
import ProductTable from "../../components/admin/ProductTable";
import { LoaderCircle } from "lucide-react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/appSlice";

export default function Dashboard() {
  const navigate = useNavigate();
  const stateContext = useContext(AdminContext);
  const { products } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  // route protection
  useEffect(() => {
    setData("testing");
    if (!stateContext.loginUser) {
      navigate("/admin/login");
    } else {
      dispatch(getProductsThunk());
    }
  }, [navigate]);

  if (stateContext.isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoaderCircle size={30} className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="p-10 space-y-10">
        <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Product List</p>
            <div className="flex items-center gap-2">
              <p className="text-sm">Filter by</p>
              <select
                name=""
                id=""
                className="text-sm border border-gray-300 rounded-lg p-1"
              >
                <option value="">Price</option>
              </select>
            </div>
          </div>
          <ProductTable products={products} />
        </div>
      </div>
    </>
  );
}
