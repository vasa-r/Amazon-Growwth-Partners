import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import close from "../../assets/close.svg";
import { toast } from "react-toastify";
import validatePayment from "../../validation/validatePayment";
import { addPayment } from "../../api/payment";
import { useNavigate } from "react-router-dom";

interface AddProps {
  showPayment: boolean;
  setModal: (arg: boolean) => void;
}

interface PaymentType {
  name: string;
  cardNumber?: string;
  paymentType: string;
  cvv?: string;
  upiId?: string;
}

const AddPayment = ({ showPayment, setModal }: AddProps) => {
  const initialValues: PaymentType = {
    name: "",
    cardNumber: "",
    paymentType: "Choose payment type",
    cvv: "",
    upiId: "",
  };

  const [paymentData, setPaymentData] = useState<PaymentType>(initialValues);
  const [formErrors, setFormErrors] = useState<Partial<PaymentType>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [type, setType] = useState("Choose payment type");
  const [showType, setShowType] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const changeType = (type: string) => {
    setPaymentData((prev) => ({ ...prev, paymentType: type }));
    setShowType(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModal(false);
      }
    };

    if (showPayment) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPayment, setModal]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validatePayment(paymentData, paymentData.paymentType);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        await createPayment();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setPaymentData(initialValues);
      }
    } else {
      toast.error("Please ensure valid payment info is given");
    }
  };

  const createPayment = async () => {
    try {
      const dataToSubmit = {
        ...paymentData,
        name: paymentData.name,
        cardNumber: paymentData.cardNumber || null,
        cvv: paymentData.cvv || null,
        upiId: paymentData.upiId || null,
      };
      const response = await addPayment(
        dataToSubmit.name,
        dataToSubmit.paymentType,
        dataToSubmit.cardNumber,
        dataToSubmit.cvv,
        dataToSubmit.upiId
      );

      if (response.success || response.status === 201) {
        toast.success(response?.data?.message);
        setModal(false);
        navigate("/cart");
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't add adress. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during adding address. Please try again later."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div
        ref={modalRef}
        className="w-[500px] rounded-md p-5 bg-white font-semibold flex flex-col justify-between items-center py-[32px] pb-[46px] relative"
      >
        <img
          className="w-6 absolute top-4 right-4 cursor-pointer"
          src={close}
          alt="close modal"
          onClick={() => setModal(false)}
        />

        <div
          className="flex w-full mt-5 justify-between relative"
          onClick={() => setShowType(!showType)}
        >
          Choose type :{" "}
          <div className="border border-black bg-slate-100 w-72 cursor-pointer center">
            {paymentData.paymentType}
          </div>
          {showType && (
            <div className="border flex flex-col gap-1 p-3  absolute top-8 right-0 border-black bg-slate-100 w-72 cursor-pointer z-50">
              <p
                className="hover:bg-white hover:p-1"
                onClick={() => changeType("UPI")}
              >
                UPI
              </p>
              <p
                className="hover:bg-white hover:p-1"
                onClick={() => changeType("Debit Card")}
              >
                Debit Card
              </p>
              <p
                className="hover:bg-white hover:p-1"
                onClick={() => changeType("Credit Card")}
              >
                Credit Card
              </p>
            </div>
          )}
        </div>

        {paymentData.paymentType === "Debit Card" && (
          <form
            className="w-full flex flex-col gap-4 mt-4"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name">Card holder name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={paymentData.name}
                onChange={handleChange}
                placeholder="Enter card holder name"
              />
              {<p className="error">{formErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="card number">Card number</label>
              <input
                type="text"
                id="card number"
                name="cardNumber"
                value={paymentData?.cardNumber}
                onChange={handleChange}
                placeholder="Enter card number"
              />
              {<p className="error">{formErrors.cardNumber}</p>}
            </div>
            <div>
              <label htmlFor="cvv">Card CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
                placeholder="Enter card CVV"
              />
              {<p className="error">{formErrors.cvv}</p>}
            </div>
            <button
              disabled={isLoading}
              className="btn btn-primary mt-4 text-white center w-full"
            >
              Save
            </button>
          </form>
        )}
        {paymentData.paymentType === "Credit Card" && (
          <form
            className="w-full flex flex-col gap-4 mt-4"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name">Card holder name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={paymentData.name}
                onChange={handleChange}
                placeholder="Enter card holder name"
              />
              {<p className="error">{formErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="card number">Card number</label>
              <input
                type="text"
                id="card number"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleChange}
                placeholder="Enter card number"
              />
              {<p className="error">{formErrors.cardNumber}</p>}
            </div>
            <div>
              <label htmlFor="cvv">Card CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
                placeholder="Enter card CVV"
              />
              {<p className="error">{formErrors.cvv}</p>}
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary mt-4 text-white center w-full"
            >
              Save
            </button>
          </form>
        )}
        {paymentData.paymentType === "UPI" && (
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4 mt-4"
          >
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={paymentData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              {<p className="error">{formErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="upi">UPI ID</label>
              <input
                type="text"
                id="name"
                name="upiId"
                value={paymentData.upiId}
                onChange={handleChange}
                placeholder="Enter your UPI"
              />
              {<p className="error">{formErrors.upiId}</p>}
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary mt-4 text-white center w-full"
            >
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddPayment;
