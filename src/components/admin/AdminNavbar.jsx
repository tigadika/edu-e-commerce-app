import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";
import { AdminContext } from "../../pages/admin/AdminLayout";
import { Moon, Sun } from "lucide-react";

export default function AdminNavbar() {
  const navigate = useNavigate();
  // context
  const stateContext = useContext(AdminContext);

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
        <div className="flex items-center justify-between px-10 h-full">
          <div className="cursor-pointer flex items-center gap-2">
            <Link to={"/"}>
              <img src="/boxboxlogo.png" alt="" className="w-14 border-white" />
            </Link>
            <Link to={"/admin"}>
              <h1 className="text-white text-2xl tracking-tighter uppercase">
                CMS
              </h1>
            </Link>
          </div>
          {/* login register */}
          <div className="flex items-center gap-5">
            {!stateContext.userLogin && (
              <>
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
              </>
            )}
            {stateContext.userLogin && (
              <>
                <p>Hi, {stateContext.userLogin.email}</p>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer bg-white rounded-md px-4 py-2 text-black tracking-tight font-semibold hover:bg-gray-300"
                >
                  Logout
                </button>
              </>
            )}
            {stateContext.theme && (
              <Sun
                className="cursor-pointer"
                onClick={stateContext.changeTheme}
              />
            )}
            {!stateContext.theme && (
              <Moon
                className="cursor-pointer"
                onClick={stateContext.changeTheme}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
