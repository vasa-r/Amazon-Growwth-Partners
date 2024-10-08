import close from "../../assets/close.svg";

interface CartItemProps {
  index: number;
  title: string;
  quantity: number;
  price: number;
  image: string;
  id: string;
  removeItem: (id: string) => void;
}

const CartItem = ({
  index,
  title,
  quantity,
  price,
  image,
  id,
  removeItem,
}: CartItemProps) => {
  return (
    <div className="center w-[900px] flex-col">
      <div className=" flex w-full mt-3 gap-8 items-center justify-start">
        <div className="w-12">{index + 1}.</div>
        <img className="w-36 h-36" src={image} alt="" />
        <div className="w-[10rem]">
          <p>Quantity : {quantity}</p>
          <p>Price : ₹{Math.ceil(quantity * (price * 83))}.00</p>
        </div>
        <div className="w-[20rem] ">
          <p className="text-xl">Title : {title}</p>
        </div>
        <img
          onClick={() => removeItem(id)}
          className="w-8 cursor-pointer"
          src={close}
          alt=""
        />
      </div>
      <hr className="w-[1100px] mt-3 border-black" />
    </div>
  );
};

export default CartItem;
