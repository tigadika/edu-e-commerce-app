import ProductRow from "./ProductRow";

// const products = [
//   {
//     id: 1,
//     name: "Premium Headphones",
//     price: 299.99,
//     image: "/placeholder.svg?height=100&width=100",
//     description: "High-quality wireless headphones with noise cancellation",
//   },
//   {
//     id: 2,
//     name: "Smart Watch",
//     price: 199.99,
//     image: "/placeholder.svg?height=100&width=100",
//     description: "Feature-rich smartwatch with health tracking",
//   },
//   {
//     id: 3,
//     name: "Laptop Backpack",
//     price: 79.99,
//     image: "/placeholder.svg?height=100&width=100",
//     description: "Durable laptop backpack with multiple compartments",
//   },
//   {
//     id: 4,
//     name: "Wireless Mouse",
//     price: 49.99,
//     image: "/placeholder.svg?height=100&width=100",
//     description: "Ergonomic wireless mouse with long battery life",
//   },
//   {
//     id: 5,
//     name: "Mechanical Keyboard",
//     price: 129.99,
//     image: "/placeholder.svg?height=100&width=100",
//     description: "RGB mechanical keyboard with customizable switches",
//   },
// ];

export default function ProductTable({ products, handleDelete }) {
  return (
    <>
      <div className="w-full overflow-x-auto border border-gray-300 rounded-lg">
        <table className="min-w-full bg-white border border-gray-400 rounded-b-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                No
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                Product Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                Product Image
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                Description
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product, i) => (
              <ProductRow
                key={i}
                product={product}
                index={i}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
