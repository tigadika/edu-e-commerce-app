import { PencilIcon, Trash } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProductRow({ product }) {
  const navigate = useNavigate();

  return (
    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {product.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${product.price.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <img
          src={product.image || "/placeholder.svg"}
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
        <button className="cursor-pointer rounded-lg border border-gray-300 p-1 hover:bg-red-400 hover:text-white">
          <Trash size={16} />
        </button>
      </td>
    </tr>
  );
}
