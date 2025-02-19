export default function CardItem({ product }) {
  return (
    <div className="bg-white rounded-md border border-gray-300 w-full cursor-pointer overflow-hidden">
      <img
        src={product.imageUrl}
        alt=""
        className="w-full h-[300px] object-cover"
      />
      <div className="p-3 flex flex-col justify-between h-44">
        <h3 className="tracking-tight text-lg">{product.name}</h3>
        <div className="space-y-2">
          <p className="tracking-tight text-xl font-semibold">
            Rp {product.price}
          </p>
          <button className="w-full px-4 py-2 rounded-md bg-black text-white">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
