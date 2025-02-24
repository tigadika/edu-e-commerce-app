import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminLayout";
import ProductTable from "../../components/admin/ProductTable";
import { LoaderCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/appSlice";
import { AuthContext } from "../Auth";

export default function Dashboard() {
  const navigate = useNavigate();
  const { loginUser, isLoading, loginUserRole } = useContext(AuthContext);
  const { products } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  // route protection
  useEffect(() => {
    if (!isLoading) {
      if (!loginUser?.email) {
        navigate("/admin/login");
      } else {
        if (loginUserRole == "customer") {
          navigate("/");
        }
        dispatch(getProductsThunk());
      }
    }
  }, [navigate, loginUser]);

  if (isLoading) {
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
