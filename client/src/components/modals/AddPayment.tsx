import { useState } from "react";
import close from "../../assets/close.svg";

const AddPayment = () => {
  const [type, setType] = useState("Choose payment type");
  const [showType, setShowType] = useState(false);
  const changeType = (type: string) => {
    setType(type);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="w-[500px]  rounded-[10px] p-5 bg-white font-semibold flex flex-col justify-between items-center py-[32px] pb-[46px] relative">
        <img
          className="w-6 absolute top-4 right-4 cursor-pointer"
          src={close}
          alt="close modal"
        />

        <div
          className="flex w-full mt-5 justify-between relative"
          onClick={() => setShowType(true)}
        >
          Choose type :{" "}
          <div className="border border-black bg-slate-100 w-72 cursor-pointer center">
            {type}
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

        {type === "Debit Card" && (
          <form className="w-full mt-4">
            <div>
              <label htmlFor="name">Card holder name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter card holder name"
              />
            </div>
            <div>
              <label htmlFor="card number">Card number</label>
              <input
                type="text"
                id="card number"
                placeholder="Enter card number"
              />
            </div>
            <div>
              <label htmlFor="cvv">Card CVV</label>
              <input type="text" id="cvv" placeholder="Enter card CVV" />
            </div>
            <button className="btn btn-primary mt-4 text-white center w-full">
              Save
            </button>
          </form>
        )}
        {type === "Credit Card" && (
          <form className="w-full mt-4">
            <div>
              <label htmlFor="name">Card holder name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter card holder name"
              />
            </div>
            <div>
              <label htmlFor="card number">Card number</label>
              <input
                type="text"
                id="card number"
                placeholder="Enter card number"
              />
            </div>
            <div>
              <label htmlFor="cvv">Card CVV</label>
              <input type="text" id="cvv" placeholder="Enter card CVV" />
            </div>
            <button className="btn btn-primary mt-4 text-white center w-full">
              Save
            </button>
          </form>
        )}
        {type === "UPI" && (
          <form className="w-full mt-4">
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            <div>
              <label htmlFor="upi">UPI ID</label>
              <input type="text" id="name" placeholder="Enter your UPI" />
            </div>
            <button className="btn btn-primary mt-4 text-white center w-full">
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddPayment;
