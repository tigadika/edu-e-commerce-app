import { ShoppingCart } from "lucide-react";
import React from "react";

export default function Navbar() {
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
          <button className="cursor-pointer">
            <ShoppingCart />
          </button>

          {/* <p>Hi, username!</p>
        <button className="bg-white rounded-md px-4 py-2 text-black tracking-tight font-semibold hover:bg-gray-300">
        Logout
        </button> */}
        </div>
      </div>
    </div>
  );
}
