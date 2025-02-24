import { deleteDoc, doc } from "firebase/firestore";
import { PencilIcon, Trash } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteProductByIdThunk } from "../../store/appSlice";

export default function ProductRow({ product, index }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        Rp {product.price}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <img
          src={product.imageUrl}
          alt={product.name}
          width={50}
          height={50}
          className="rounded-md object-cover"
        />
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 max-w-[200px] truncate">
        {product.description}
      </td>
      <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
        <button
          onClick={() => {
            navigate(`/admin/edit-product/${product.id}`);
          }}
          className="cursor-pointer rounded-lg border border-gray-300 p-1 hover:bg-gray-300"
        >
          <PencilIcon size={16} />
        </button>
        <button
          onClick={() => {
            dispatch(deleteProductByIdThunk(product.id));
          }}
          className="cursor-pointer rounded-lg border border-gray-300 p-1 hover:bg-red-400 hover:text-white"
        >
          <Trash size={16} />
        </button>
      </td>
    </tr>
  );
}
