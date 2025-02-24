import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";
import { Moon, Sun } from "lucide-react";
import { AuthContext } from "../../pages/Auth";

export default function AdminNavbar() {
  const navigate = useNavigate();
  // context
  const { theme, loginUser, changeTheme } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
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
            {!loginUser?.email && (
              <>
                <Link
                  to={"/login"}
                  className="cursor-pointer tracking-tight font-semibold hover:text-gray-300"
                >
                  Sign In
                </Link>
                <Link
                  to={"/register"}
                  className="cursor-pointer bg-white rounded-md px-4 py-2 text-black tracking-tight font-semibold hover:bg-gray-300"
                >
                  Sign Up
                </Link>
              </>
            )}
            {loginUser?.email && (
              <>
                <p>Hi, {loginUser?.email}</p>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer bg-white rounded-md px-4 py-2 text-black tracking-tight font-semibold hover:bg-gray-300"
                >
                  Logout
                </button>
              </>
            )}
            {theme && <Sun className="cursor-pointer" onClick={changeTheme} />}
            {!theme && (
              <Moon className="cursor-pointer" onClick={changeTheme} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
