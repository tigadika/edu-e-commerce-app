import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

export default function ProductForm({ productById, productId }) {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const changeInput = (event) => {
    const { value, name } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsLoadingForm(true);
    try {
      if (productId) {
        await updateDoc(doc(db, "products", productId), input);

        toast.success("Success edit item" + productId);
      } else {
        const docRef = await addDoc(collection(db, "products"), input);
        toast.success("Success add item id" + docRef.id);
      }

      navigate("/admin");
    } catch (error) {
      console.log(error);
      toast.error("Error products");
    } finally {
      setIsLoadingForm(false);
    }
  };

  useEffect(() => {
    if (productById) {
      setInput(productById);
    } else {
      setInput({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
      });
    }
  }, [productById]);

  return (
    <>
      <form onSubmit={handleOnSubmit} className="space-y-6 w-1/2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            onChange={changeInput}
            value={input.name}
            type="text"
            id="name"
            name="name"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border`}
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Product Price
          </label>
          <input
            onChange={changeInput}
            value={input.price}
            type="number"
            id="price"
            name="price"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border`}
            placeholder="Enter product price"
          />
        </div>
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Product Image Url
          </label>
          <input
            onChange={changeInput}
            value={input.imageUrl}
            type="text"
            id="imageUrl"
            name="imageUrl"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border`}
            placeholder="Enter product imageUrl"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Product Description
          </label>
          <input
            onChange={changeInput}
            value={input.description}
            type="text"
            id="description"
            name="description"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border`}
            placeholder="Enter product description"
          />
        </div>
        <div>
          <button
            type="submit"
            className="cursor-pointer text-sm bg-black rounded-lg text-white hover:bg-gray-800 px-6 py-2"
          >
            {!isLoadingForm && "Submit"}
            {isLoadingForm && <LoaderCircle className="animate-spin" />}
          </button>
        </div>
      </form>
    </>
  );
}
