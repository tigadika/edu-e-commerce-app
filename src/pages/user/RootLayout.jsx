import { Outlet } from "react-router-dom";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getUserProfileThunk } from "../../store/appSlice";

export default function RootLayout() {
  const dispatch = useDispatch();

  // ambil user
  useEffect(() => {
    dispatch(getUserProfileThunk());
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen lg:mx-40 md:mx-18 mx-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
