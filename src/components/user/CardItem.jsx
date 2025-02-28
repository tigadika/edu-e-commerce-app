import { addDoc, collection, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

export default function CardItem({ product }) {
  const { loginUser } = useSelector((state) => state.app);

  const handleAddToCart = async () => {
    try {
      const input = { ...product, userId: loginUser.uid, quantity: 1 };
      delete input.id;
      await addDoc(collection(db, "carts"), input);
      toast.success("berhasil menambahkan ke keranjang");
    } catch (error) {
      toast.error(error);
    }
  };

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
          <button
            onClick={handleAddToCart}
            className="w-full px-4 py-2 rounded-md bg-black text-white cursor-pointer"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
