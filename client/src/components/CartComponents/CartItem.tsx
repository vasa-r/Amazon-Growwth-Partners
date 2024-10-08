import close from "../../assets/close.svg";

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

const CartItem = () => {
  return (
    <>
      <div className="w-[1100px] flex justify-around items-center">
        <p>1</p>
        <p>{data.title}</p>
        <p>4</p>
        <p>₹ {data.price}</p>
        <img className="w-24 h-24" src={data.image} alt="product image" />
        <img
          className="w-6 h-6 cursor-pointer"
          src={close}
          alt="remove item"
          title="remove item"
        />
      </div>
      <hr className="w-[1100px] border-black" />
    </>
  );
};

export default CartItem;
