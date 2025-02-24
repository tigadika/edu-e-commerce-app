import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { AdminContext } from "../admin/AdminLayout";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../Auth";

export default function Register() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { loginUser, isLoading, theme } = useContext(AuthContext);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    setInput({ ...input, [name]: value });
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      if (userCredential.user.uid) {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          role: "customer",
        });
      }
      navigate("/login");
      toast.success("Register success");
    } catch (error) {
      switch (error.message) {
        case "Firebase: Error (auth/invalid-email).":
          toast.error("Invalid Email");
          return;
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          toast.error("Weak Password");
          return;
        case "Firebase: Error (auth/email-already-in-use).":
          toast.error("Email already in use");
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
    if (!isLoading) {
      if (loginUser?.email) {
        navigate("/admin");
      }
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoaderCircle size={30} className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen">
        <div className="flex-grow p-4">
          <img
            src="/banner-login.jpeg"
            alt=""
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
        <div className="w-3/5 flex flex-col items-center gap-5 justify-center">
          <div className="flex flex-col items-center">
            <img src="/boxboxlogo.png" alt="" className="w-12 h-12" />
            <h1 className="text-2xl tracking-tight font-bold">
              Register To BoxBox CMS Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              Register as admin to access CMS Feature
            </p>
          </div>
          <form
            onSubmit={handleSubmitRegister}
            className="w-full px-10 space-y-5"
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="text-black text-sm tracking-tight font-semibold"
                >
                  First Name
                </label>
                <input
                  onChange={handleChangeInput}
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-2 rounded-md border border-black"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="text-black text-sm tracking-tight font-semibold"
                >
                  Last Name
                </label>
                <input
                  onChange={handleChangeInput}
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 rounded-md border border-black"
                />
              </div>
            </div>
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
              <input
                onChange={handleChangeInput}
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-md border border-black"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-black rounded-md w-full text-white flex items-center justify-center"
            >
              {loading && <LoaderCircle className="animate-spin" />}
              {!loading && <p>Sign Up</p>}
            </button>
            <p>
              Already have an account?{" "}
              <Link to={"/login"} className="underline">
                Login
              </Link>{" "}
              here
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
