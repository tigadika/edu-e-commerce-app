import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db, provider } from "../../config/firebase";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { AuthContext } from "../Auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Login() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

  const { loginUser, isLoading, theme } = useContext(AuthContext);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    setInput({ ...input, [name]: value });
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, input.email, input.password);

      const user = await getDoc(doc(db, "users", user.uid));
      if (user.data().role === "customer") {
        navigate("/");
      } else {
        navigate("/admin");
      }
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

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // kita check dulu di db, kalau udah ada pake yg udah ada
      // kalau belum kita buat baru
      const user = await getDoc(doc(db, "users", result.user.uid));

      if (!user.data()) {
        if (result.user.uid) {
          await setDoc(doc(db, "users", result.user.uid), {
            email: result.user.email,
            firstName: result.user.displayName.split(" ")[0],
            lastName: result.user.displayName.split(" ")[1],
            role: "customer",
          });
        }
      }
      console.log(result, "<<<<");
    } catch (error) {
      console.log(error);
    }
  };

  // route protection
  useEffect(() => {
    if (!isLoading) {
      if (loginUser?.email) {
        navigate("/admin");
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
      <div
        className={
          (theme ? "bg-white text-black" : "bg-gray-900 text-white") +
          " flex h-screen"
        }
      >
        <div className="w-full flex flex-col items-center gap-5 justify-center">
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
                className="text-sm tracking-tight font-semibold"
              >
                Email
              </label>
              <input
                onChange={handleChangeInput}
                name="email"
                id="email"
                type="text"
                placeholder="Email"
                className={
                  (theme ? "border-black" : "border-gray-300") +
                  " w-full px-4 py-2 rounded-md border"
                }
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm tracking-tight font-semibold"
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
                  className={
                    (theme ? "border-black" : "border-gray-300") +
                    " w-full px-4 py-2 rounded-md border"
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className={
                (theme ? "bg-black text-white" : "bg-white text-black") +
                " px-4 py-2 rounded-md w-full flex justify-center items-center"
              }
            >
              {loading && <LoaderCircle className="animate-spin" />}
              {!loading && <p>Sign In</p>}
            </button>
            <p>
              Don't have an account?{" "}
              <Link to={"/register"} className="underline">
                Register
              </Link>{" "}
              here
            </p>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="w-1/2 py-2 flex items-center justify-center bg-black rounded-lg text-white cursor-pointer"
          >
            Sign In with Google
          </button>
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
