import { Outlet } from "react-router-dom";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext(null);

export default function RootLayout() {
  const [userLogin, setUserLogin] = useState(null);
  const [loading, setLoading] = useState(true);

  // ambil user
  useEffect(() => {
    setLoading(true);
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogin(user.email);
        setLoading(false);
      } else {
        setUserLogin(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <UserContext.Provider value={{ userLogin, loading }}>
        <Navbar />
        <div className="min-h-screen lg:mx-40 md:mx-18 mx-4">
          <Outlet />
        </div>
        <Footer />
      </UserContext.Provider>
    </>
  );
}
