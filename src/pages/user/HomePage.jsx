import { ArrowDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import CardItem from "../../components/user/CardItem";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/appSlice";

export default function HomePage() {
  const { products } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const [queries, setQueries] = useState({
    filterCategory: "",
    sortPrice: "",
  });

  const handleChangeQuery = (e) => {
    const { name, value } = e.target;
    setQueries({ ...queries, [name]: value });
  };

  useEffect(() => {
    if (queries) {
      dispatch(getProductsThunk(queries));
    } else {
      dispatch(getProductsThunk());
    }
  }, [queries]);

  return (
    <>
      <div className="space-y-20 py-20 px-40">
        <img src="/banner1.webp" alt="" className="w-full" />
        <div className="space-y-4">
          <div className="flex justify-end items-center gap-2">
            <select
              name="filterCategory"
              id="filterCategory"
              defaultValue={""}
              className="px-4 py-2 rounded-md border text-sm"
              onChange={handleChangeQuery}
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
            <select
              name="sortPrice"
              id="sortPrice"
              defaultValue={""}
              className="px-4 py-2 rounded-md border text-sm"
              onChange={handleChangeQuery}
            >
              <option value="">Sort Price</option>
              <option value="asc">Harga terendah</option>
              <option value="desc">Harga tertinggi</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
            {products &&
              products.map((product) => (
                <CardItem key={product.id} product={product} />
              ))}
            {products.length < 1 && (
              <div className="h-48 col-span-4 flex justify-center items-center">
                Tidak ada lagi produk...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
