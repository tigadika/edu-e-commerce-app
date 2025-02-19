import { ArrowDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import CardItem from "../../components/user/CardItem";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  onFetchProductSuccess,
} from "../../store/appSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function HomePage() {
  const { value, products } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));

      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      dispatch(onFetchProductSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="space-y-20 py-20">
        {/* <div className="text-3xl">{value}</div>
        <button
          onClick={() => {
            dispatch(increment());
          }}
          className="p-4 bg-purple-100 rounded-lg"
        >
          +
        </button>
        <button
          onClick={() => {
            dispatch(decrement());
          }}
          className="p-4 bg-purple-100 rounded-lg"
        >
          -
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(incrementByAmount(+e.target[0].value));
          }}
        >
          <input type="number" className="border" />
        </form> */}
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
            {products &&
              products.map((product) => (
                <CardItem key={product.id} product={product} />
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
