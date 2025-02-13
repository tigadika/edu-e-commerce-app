import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    setInput({ ...input, [name]: value });
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      navigate("/admin");
      toast.success("Login success");
    } catch (error) {
      switch (error.message) {
        case "Firebase: Error (auth/invalid-credential).":
          toast.error("Invalid Email/Password");
          return;
        case "Firebase: Error (auth/invalid-email).":
          toast.error("Invalid Email");
          return;
        default:
          console.log(error.message, "<<<<<<");
          return;
      }
    } finally {
      setLoading(false);
    }
  };

  // route protection
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        navigate("/admin");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
    <>
      <div className="flex h-full">
        <div className="w-3/5 flex flex-col items-center gap-5 justify-center">
          <div className="flex flex-col items-center">
            <img src="/boxboxlogo.png" alt="" className="w-12 h-12" />
            <h1 className="text-2xl tracking-tight font-bold">
              Login To BoxBox CMS Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              Login as admin to access CMS Feature
            </p>
          </div>
          <form onSubmit={handleSubmitLogin} className="w-full px-10 space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-black text-sm tracking-tight font-semibold"
              >
                Email
              </label>
              <input
                onChange={handleChangeInput}
                name="email"
                id="email"
                type="text"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-md border border-black"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-black text-sm tracking-tight font-semibold"
              >
                Password
              </label>
              <div className="relative">
                <div
                  onClick={() => {
                    setIsShowPass(!isShowPass);
                  }}
                  role="button"
                  className="absolute right-0 top-0 mt-2 mr-2 cursor-pointer"
                >
                  {isShowPass && <Eye />}
                  {!isShowPass && <EyeClosed />}
                </div>
                <input
                  onChange={handleChangeInput}
                  name="password"
                  id="password"
                  type={isShowPass ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-md border border-black"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-black rounded-md w-full text-white flex justify-center items-center"
            >
              {loading && <LoaderCircle className="animate-spin" />}
              {!loading && <p>Sign In</p>}
            </button>
            <p>
              Don't have an account?{" "}
              <Link to={"/admin/register"} className="underline">
                Register
              </Link>{" "}
              here
            </p>
          </form>
        </div>
        <div className="flex-grow p-4">
          <img
            src="/banner-login.jpeg"
            alt=""
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
      </div>
    </>
  );
}
