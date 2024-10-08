import { useEffect, useRef } from "react";
import close from "../../assets/close.svg";
import tick from "../../assets/tick.svg";
import { useNavigate } from "react-router-dom";

interface CartModalProps {
  showModal: boolean;
  setShowModal: (arg: boolean) => void;
  title: string | undefined;
}

const CartModal = ({ showModal, setShowModal, title }: CartModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    if (showModal) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal, setShowModal]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div
        ref={modalRef}
        className="w-[500px]  rounded-[10px] bg-white font-semibold flex flex-col justify-between items-center py-[32px] pb-[46px] relative"
      >
        <img
          className="w-6 absolute top-4 right-4 cursor-pointer"
          src={close}
          alt="close modal"
          onClick={() => setShowModal(false)}
        />
        <div className="flex flex-col items-center w-[75%] gap-5">
          <img className="w-28" src={tick} alt="tick" />
          <p className="text-xl text-center">{title} added Successfully</p>
          <button
            onClick={() => navigate("/cart")}
            className="btn btn-primary w-full cursor-pointer text-lg text-white"
          >
            Go to cart
          </button>
          <button
            onClick={() => navigate("/products")}
            className="btn btn-primary w-full cursor-pointer text-lg text-white"
          >
            Continue browsing
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
