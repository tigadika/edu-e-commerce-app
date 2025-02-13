import { ArrowDown } from "lucide-react";
import React from "react";
import CardItem from "../../components/user/CardItem";

export default function HomePage() {
  return (
    <>
      <div className="space-y-20 py-20">
        <img src="/banner1.webp" alt="" className="w-full" />
        <div className="space-y-4">
          <div className="flex justify-end items-center gap-2">
            <select
              name="Search"
              id="Search"
              defaultValue={""}
              className="px-4 py-2 rounded-md border text-sm"
            >
              <option value="">Select Category</option>
              <option value="iphone">iPhone</option>
              <option value="ipad">iPad</option>
              <option value="mac">Mac</option>
              <option value="airpods">Airpods</option>
            </select>
            <button className="px-4 py-2 text-sm rounded-md border">
              &lt;
            </button>
            <p className="text-gray-400 text-sm italic">Page: 1</p>
            <button className="px-4 py-2 text-sm rounded-md border">
              &gt;
            </button>
            <button
              name="sort-price"
              id="sort-price"
              className="flex items-center justify-center gap-1 px-4 py-2 rounded-md border text-sm"
            >
              Price
              <ArrowDown size={12} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardItem key={i} />
            ))}
            {/* <div className="h-48 col-span-4 flex justify-center items-center">
              Tidak ada lagi produk...
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
