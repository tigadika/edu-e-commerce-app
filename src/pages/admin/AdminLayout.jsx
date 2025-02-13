import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <div className="h-[100vh] pt-15">
        <Outlet />
      </div>
      <ToastContainer />
    </>
  );
}
