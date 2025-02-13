import { Outlet } from "react-router-dom";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen lg:mx-40 md:mx-18 mx-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
