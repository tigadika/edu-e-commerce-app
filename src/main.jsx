import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/user/RootLayout.jsx";
import HomePage from "./pages/user/HomePage.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminRegister from "./pages/admin/AdminRegister.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import EditProduct from "./pages/admin/EditProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "register",
        element: <AdminRegister />,
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
);
