import React, { useEffect, useState } from "react";
import CartItem from "../components/CartComponents/CartItem";
import AddAddress from "../components/modals/AddAddress";
import AddPayment from "../components/modals/AddPayment";

interface CartItemProps {
  id: string;
  title: string;
  quantity: number;
  price: number;
  image: string;
}

const CartPage = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const [newPayment, setNewPayment] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);

  useEffect(() => {
    const storedItems = Object.keys(window.localStorage)
      .filter((key) => key.startsWith("cartItem_"))
      .map((key) => JSON.parse(window.localStorage.getItem(key)!));

    setCartItems(storedItems);
  }, []);

  //   useEffect(() => {
  //     const handleClickOutside = (event: MouseEvent) => {
  //       if (
  //         menuRef.current &&
  //         !menuRef.current.contains(event.target as Node) &&
  //         menuButtonRef.current &&
  //         !menuButtonRef.current.contains(event.target as Node)
  //       ) {
  //         setShowProfile(false);
  //       }
  //     };

  //     if (showProfile) {
  //       document.addEventListener("mousedown", handleClickOutside);
  //     } else {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     }

  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, [showProfile]);

  const clearCart = () => {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith("cartItem_"))
      .forEach((key) => window.localStorage.removeItem(key));

    setCartItems([]);
  };

  const removeCartItem = (id: string) => {
    window.localStorage.removeItem(`cartItem_${id}`);

    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((acc: number, item: CartItemProps) => {
    return acc + item.price * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="btm-comp center p-10  py-11">
        <h1 className="text-2xl font-bold">
          Cart is Empty. Please add products
        </h1>
      </div>
    );
  }

  return (
    <>
      {newAddress && (
        <AddAddress showAddress={newAddress} setModal={setNewAddress} />
      )}
      {newPayment && (
        <AddPayment showPayment={newPayment} setModal={setNewPayment} />
      )}

      <div className="btm-comp p-10  py-11">
        <div className="flex justify-between">
          <h1 className="text-2xl">Your Cart Items</h1>
          <button className="btn btn-primary" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
        <div className="center flex-col">
          {cartItems?.map(({ id, quantity, title, image, price }, index) => (
            <CartItem
              key={id}
              quantity={quantity}
              index={index}
              title={title}
              image={image}
              price={price}
              id={id}
              removeItem={removeCartItem}
            />
          ))}
          <div className="center py-8">
            <h1 className="text-black text-2xl font-bold">
              Total Price : ₹ {totalPrice * 83}.00
            </h1>
          </div>
          <hr className="w-[1100px] center  border-black" />
        </div>

        <div className="flex items-center justify-between">
          <div className="mt-10 flex gap-10 w-[39rem] items-center relative">
            <h1 className="text-2xl">Delivery address:</h1>
            <div
              className="p-1 w-96 border bg-white center border-black rounded-sm cursor-pointer"
              onClick={() => setShowAddress(!showAddress)}
            >
              Choose delivery address
            </div>

            {showAddress && (
              <div className="p-1 flex flex-col gap-3 absolute top-10 right-[16px] z-50 w-96 border bg-white center border-black rounded-sm ">
                <p>No Saved address</p>
                <button
                  onClick={() => setNewAddress(true)}
                  className="btn btn-primary"
                >
                  Add new Address
                </button>
              </div>
            )}
          </div>
          <div className="mt-10 flex gap-10 w-[39rem] items-center relative">
            <h1 className="text-2xl">Payment Methods:</h1>
            <div
              className="p-1 w-96 border bg-white center border-black rounded-sm cursor-pointer"
              onClick={() => setShowPayment(!showPayment)}
            >
              Choose payment method
            </div>
            {showPayment && (
              <div className="p-1 flex flex-col gap-3 absolute top-10 right-0 z-50 w-96 border bg-white center border-black rounded-sm ">
                <p>No Saved payment methods</p>
                <button
                  onClick={() => setNewPayment(true)}
                  className="btn btn-primary"
                >
                  Add payment method
                </button>
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
    </>
  );
};

export default CartPage;
