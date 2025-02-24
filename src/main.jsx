import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/user/RootLayout.jsx";
import HomePage from "./pages/user/HomePage.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import EditProduct from "./pages/admin/EditProduct.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";
import Auth from "./pages/Auth.jsx";
import Login from "./pages/user/Login.jsx";
import Register from "./pages/user/Register.jsx";

const router = createBrowserRouter([
  {
    element: <Auth />,
    children: [
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
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>
);
