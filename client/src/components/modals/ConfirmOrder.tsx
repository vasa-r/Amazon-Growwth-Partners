import { useEffect, useRef } from "react";
import Close from "../../assets/close.svg";

interface Address {
  addressTitle: string;
  buildNo: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  _id: string;
}
interface Payment {
  name?: string;
  paymentType: string;
  cardNumber?: string;
  cvv?: string;
  upiId?: string;
  _id?: string;
}

interface CartModalProps {
  showModal: boolean;
  setModal: (arg: boolean) => void;
  address: Address;
  payment: Payment;
  createOrder: () => void;
}

const ConfirmOrder = ({
  showModal,
  setModal,
  address,
  payment,
  createOrder,
}: CartModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModal(false);
      }
    };

    if (showModal) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal, setModal]);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div
        ref={modalRef}
        className=" p-10 rounded-[10px] bg-white font-semibold flex flex-col justify-between items-center py-[32px] pb-[46px] relative"
      >
        <img
          className="absolute w-6 cursor-pointer top-4 right-4"
          src={Close}
          alt="close modal"
          onClick={() => setModal(false)}
        />
        <div className="flex gap-10">
          <div className="w-[25rem]">
            <h1 className="text-2xl">Address</h1>
            <div>
              <p>Title : {address.addressTitle}</p>
              <p>No : {address.buildNo}</p>
              <p>Address : {address.address}</p>
              <p>City : {address.city}</p>
              <p>Pincode : {address.pincode}</p>
              <p>Phone : {address.phone}</p>
            </div>
          </div>

          <div className="w-3/6">
            <h1 className="text-2xl">Payment</h1>
            <div>
              <p>{payment.name}</p>
              {payment?.cardNumber && <p>Card : {payment?.cardNumber}</p>}
              {payment?.upiId && <p>UPI ID : {payment?.upiId}</p>}
            </div>
          </div>
        </div>

        <button
          onClick={createOrder}
          className="w-full mt-8 text-lg text-white cursor-pointer btn btn-primary"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
