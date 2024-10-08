import { useState } from "react";
import star from "../assets/star.svg";
import minus from "../assets/minus.svg";
import plus from "../assets/plus.svg";
import CartModal from "../components/modals/CartModal";

const data = {
  title: "Essence Mascara Lash Princess",
  description:
    "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  category: "beauty",
  price: 9.99,
  rating: 4.94,
  shippingInformation: "Ships in 1 month",
  image:
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
};

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
  };
  return (
    <>
      <CartModal />
      <div className="btm-comp p-10 h-[calc(100vh-80px)] flex justify-center items-center">
        <div className="w-full flex gap-3">
          <div>
            <img className="h-[35rem] w-[50rem]" src={data.image} alt="" />
          </div>
          <div className="flex-1">
            <h1 className="text-black text-5xl font-bold">{data.title}</h1>
            <p className="pt-7 text-black text-xl font-medium">
              {data.description}
            </p>
            <p className="text-lg flex">
              Ratings: {data.rating}
              <img className="w-4 fill-gold" src={star} alt="rating" />
            </p>
            <h1 className="text-3xl font-semibold mt-8">
              ₹ {Math.ceil(data.price * 83)}.00
            </h1>
            <p className="text-lg mt-2">{data.shippingInformation}</p>

            <div className="flex items-center mt-8">
              <h1 className="text-2xl">Quantity: </h1>{" "}
              <div className=" w-[10rem] h-12 flex justify-between items-center p-3">
                <div
                  className="center w-12 h-12 hover:bg-slate-100 rounded-md cursor-pointer"
                  onClick={handleDecrement}
                >
                  <img className="w-6" src={minus} alt="remove" />
                </div>
                <div className="center text-2xl">{quantity}</div>
                <div
                  className="center w-12 h-12 hover:bg-slate-100 rounded-md cursor-pointer"
                  onClick={handleIncrement}
                >
                  <img className="w-6" src={plus} alt="add" />
                </div>
              </div>
            </div>
            <button className="btn btn-primary mt-8 w-3/4">Add to cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
