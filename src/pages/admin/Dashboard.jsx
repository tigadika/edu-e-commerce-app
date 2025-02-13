import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminLayout";

export default function Dashboard() {
  const navigate = useNavigate();
  const stateContext = useContext(AdminContext);

  // route protection
  useEffect(() => {
    if (!stateContext.userLogin) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <>
      <div className="mx-40 py-10">
        <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>
      </div>
    </>
  );
}
