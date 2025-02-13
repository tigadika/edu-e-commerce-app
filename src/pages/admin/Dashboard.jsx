import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // route protection
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
      } else {
        console.log("tidak ada user login");
        navigate("/admin/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
    <>
      <div className="mx-40 py-10">
        <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>
      </div>
    </>
  );
}
