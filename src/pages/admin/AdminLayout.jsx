import React, { createContext, useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileThunk } from "../../store/appSlice";

export const AdminContext = createContext(null);

export default function AdminLayout() {
  const [theme, setTheme] = useState(true);
  const { loginUser, isLoading } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const changeTheme = () => {
    setTheme(!theme);
  };

  // ambil user
  useEffect(() => {
    dispatch(getUserProfileThunk());
  }, []);

  return (
    <>
      <AdminContext.Provider
        value={{ theme, changeTheme, loginUser, isLoading }}
      >
        <AdminNavbar />
        <div className="h-[100vh] pt-15 flex">
          {!isLoading && loginUser.email && <AdminSidebar />}
          <div
            className={(loginUser.email ? "pl-[200px] " : " ") + "flex-grow"}
          >
            <Outlet />
          </div>
        </div>
        <ToastContainer />
      </AdminContext.Provider>
    </>
  );
}
