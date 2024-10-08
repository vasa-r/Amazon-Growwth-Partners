import React, { useState } from "react";
import CartItem from "../components/CartComponents/CartItem";
// import AddAddress from "../components/modals/AddAddress";
// import AddPayment from "../components/modals/AddPayment";

const CartPage = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  return (
    <div className="btm-comp p-10  py-11">
      <div className="flex justify-between">
        <h1 className="text-2xl">Your Cart Items</h1>
        <button className="btn btn-primary">Clear Cart</button>
      </div>
      <CartItem />

      <div className="flex items-center justify-between">
        <div className="mt-10 flex gap-10 w-[39rem] items-center relative">
          <h1 className="text-2xl">Delivery address:</h1>
          <div
            className="p-1 w-96 border bg-white center border-black rounded-sm cursor-pointer"
            onClick={() => setShowAddress(true)}
          >
            Choose delivery address
          </div>

          {showAddress && (
            <div className="p-1 flex flex-col gap-3 absolute top-10 right-[16px] z-50 w-96 border bg-white center border-black rounded-sm ">
              <p>No Saved address</p>
              <button className="btn btn-primary">Add new Address</button>
            </div>
          )}
        </div>
        <div className="mt-10 flex gap-10 w-[39rem] items-center relative">
          <h1 className="text-2xl">Payment Methods:</h1>
          <div
            className="p-1 w-96 border bg-white center border-black rounded-sm cursor-pointer"
            onClick={() => setShowPayment(true)}
          >
            Choose payment method
          </div>
          {showPayment && (
            <div className="p-1 flex flex-col gap-3 absolute top-10 right-0 z-50 w-96 border bg-white center border-black rounded-sm ">
              <p>No Saved payment methods</p>
              <button className="btn btn-primary">Add payment method</button>
            </div>
          )}
        </div>
      </div>
      <div className=" mt-10 center p-32">
        <button className="btn btn-primary cursor-pointer w-full text-xl">
          Place your Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
