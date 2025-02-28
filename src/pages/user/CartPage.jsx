import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CardItem from "../../components/user/CardItem";

export default function CartPage() {
  const { loginUser } = useSelector((state) => state.app);

  const [productCarts, setProductCarts] = useState([]);

  const getData = async () => {
    try {
      const q = query(
        collection(db, "carts"),
        where("userId", "==", loginUser.uid)
      );

      const dataSnapshot = await getDocs(q);
      let data = [];
      dataSnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      console.log(data);

      setProductCarts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginUser.uid) {
      getData();
    }
  }, [loginUser]);

  return (
    <div>
      <h1>Cart Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {productCarts &&
          productCarts.map((product) => (
            <CardItem key={product.id} product={product} />
          ))}
        {productCarts.length < 1 && (
          <div className="h-48 col-span-4 flex justify-center items-center">
            Tidak ada lagi produk...
          </div>
        )}
      </div>
    </div>
  );
}
