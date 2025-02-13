import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
      toast.success("Logout successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="fixed w-screen bg-black text-white h-16 z-40">
        <div className="flex items-center justify-between xl:px-40 md:px-18 px-4 h-full">
          <div className="cursor-pointer">
            <Link to={"/"}>
              <img src="/boxboxlogo.png" alt="" className="w-14 border-white" />
            </Link>
          </div>
          {/* login register */}
          <div className="flex items-center gap-5">
            <Link
              to={"/admin/login"}
              className="cursor-pointer tracking-tight font-semibold hover:text-gray-300"
            >
              Sign In
            </Link>
            <Link
              to={"/admin/register"}
              className="cursor-pointer bg-white rounded-md px-4 py-2 text-black tracking-tight font-semibold hover:bg-gray-300"
            >
              Sign Up
            </Link>
            <p>Hi, username!</p>
            <button
              onClick={handleLogout}
              className="cursor-pointer bg-white rounded-md px-4 py-2 text-black tracking-tight font-semibold hover:bg-gray-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
