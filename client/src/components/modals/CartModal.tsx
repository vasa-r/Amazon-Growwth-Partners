import close from "../../assets/close.svg";
import tick from "../../assets/tick.svg";

const CartModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="w-[500px]  rounded-[10px] bg-white font-semibold flex flex-col justify-between items-center py-[32px] pb-[46px] relative">
        <img
          className="w-6 absolute top-4 right-4 cursor-pointer"
          src={close}
          alt="close modal"
        />
        <div className="flex flex-col items-center gap-5">
          <img className="w-28" src={tick} alt="tick" />
          <p className="text-xl">Item added Successfully</p>
          <button className="btn btn-primary w-full cursor-pointer text-lg text-white">
            Go to cart
          </button>
          <button className="btn btn-primary w-full cursor-pointer text-lg text-white">
            Continue browsing
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
