import React, { createContext, useContext, useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileThunk } from "../../store/appSlice";
import { AuthContext } from "../Auth";

export const AdminContext = createContext(null);

export default function AdminLayout() {
  const { isLoading, loginUser } = useContext(AuthContext);

  return (
    <>
      <AdminNavbar />
      <div className="h-[100vh] pt-15 flex">
        {!isLoading && loginUser?.email && <AdminSidebar />}
        <div className={(loginUser?.email ? "pl-[200px] " : " ") + "flex-grow"}>
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
