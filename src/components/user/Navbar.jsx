import { signInWithPopup, signOut } from "firebase/auth";
import { ShoppingCart } from "lucide-react";
import { auth, provider } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";

export default function Navbar() {
  const { loginUser, isLoading, products } = useSelector((state) => state.app);
  const navigate = useNavigate();

  const handleGoogleLoginInUserPlatform = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      toast.success("Logout successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed w-screen bg-black text-white h-16 z-40">
      <div className="flex items-center justify-between xl:px-40 md:px-18 px-4">
        <div className="cursor-pointer">
          <img src="/boxboxlogo.png" alt="" className="w-14 border-white" />
        </div>
        {/* menu */}
        <div className="gap-5 h-16 hidden md:flex">
          <div className="h-full flex items-center px-4 hover:bg-white hover:text-black cursor-pointer">
            Iphone
          </div>
          <div className="h-full flex items-center px-4 hover:bg-white hover:text-black cursor-pointer">
            Ipad
          </div>
          <div className="h-full flex items-center px-4 hover:bg-white hover:text-black cursor-pointer">
            Mac
          </div>
          <div className="h-full flex items-center px-4 hover:bg-white hover:text-black cursor-pointer">
            Airpods
          </div>
        </div>
        {/* login register */}
        <div className="flex items-center gap-5">
          {!isLoading && loginUser?.email && (
            <>
              <LinkRouter to={"/cart"} className="cursor-pointer">
                <ShoppingCart />
              </LinkRouter>
              <p>Hi, {loginUser?.email}!</p>
              <button
                onClick={handleLogout}
                className="bg-white rounded-md px-4 py-2 text-black tracking-tight font-semibold hover:bg-gray-300"
              >
                Logout
              </button>
            </>
          )}

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
        </div>
      </div>
    </div>
  );
}
