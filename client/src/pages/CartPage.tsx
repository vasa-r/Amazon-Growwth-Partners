import React, { useEffect, useRef, useState } from "react";
import CartItem from "../components/CartComponents/CartItem";
import AddAddress from "../components/modals/AddAddress";
import AddPayment from "../components/modals/AddPayment";
import { getAddresses } from "../api/address";
import { getPayments } from "../api/payment";
import ConfirmOrder from "../components/modals/ConfirmOrder";
import { toast } from "react-toastify";
import { addorder } from "../api/order";
import { useNavigate } from "react-router-dom";

interface CartItemProps {
  id: string;
  title: string;
  quantity: number;
  price: number;
  image: string;
}

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

export interface OrderType {
  address: string | undefined;
  products: Array<{
    id: string;
    image: string;
    price: string;
    quantity: string;
    title: string;
  }>;
  totalPrice: number;
  paymentMode: string | undefined;
}

const CartPage = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const [newPayment, setNewPayment] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const addressRef = useRef<HTMLDivElement | null>(null);
  const paymentRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = Object.keys(window.localStorage)
      .filter((key) => key.startsWith("cartItem_"))
      .map((key) => JSON.parse(window.localStorage.getItem(key)!));

    setCartItems(storedItems);
  }, []);

  useEffect(() => {
    getAddress();
    getPayment();
  }, [newAddress, newPayment]);

  const getAddress = async () => {
    const items = await getAddresses();
    setAddresses(items?.data?.data);
  };

  const getPayment = async () => {
    const items = await getPayments();
    setPayments(items?.data?.data);
  };

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
  console.log(cartItems);

  const totalPrice = cartItems.reduce((acc: number, item: CartItemProps) => {
    return acc + item.price * item.quantity;
  }, 0);

  const selectDeliveryAddress = (arg: Address) => {
    setSelectedAddress(arg);
  };

  const selectDeliveryPayment = (arg: Payment | "COD") => {
    if (arg === "COD") {
      setSelectedPayment({ paymentType: "COD" });
    } else {
      setSelectedPayment(arg);
    }
  };

  const showConfirmModal = () => {
    if (!selectedAddress) {
      toast.error("Please select delivery address");
      return;
    } else if (!selectedPayment) {
      toast.error("Please select payment method");
      return;
    }

    setConfirmOrder(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        addressRef.current &&
        !addressRef.current.contains(event.target as Node)
      ) {
        setShowAddress(false);
      }
      if (
        paymentRef.current &&
        !paymentRef.current.contains(event.target as Node)
      ) {
        setShowPayment(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddress, showPayment]);

  const handleCreateOrder = async () => {
    const order: OrderType = {
      address: selectedAddress?._id,
      products: cartItems.map((item) => ({
        id: item.id,
        image: item.image,
        price: (item.price * 83).toString(),
        quantity: item.quantity.toString(),
        title: item.title,
      })),
      totalPrice: totalPrice * 83,
      paymentMode: selectedPayment?.paymentType,
    };
    try {
      console.log(order);
      const response = await addorder(
        order.address,
        order.products,
        order.totalPrice,
        order.paymentMode
      );
      if (response.success || response.status === 201) {
        toast.success(response?.data?.message);
        setConfirmOrder(false);
        clearCart();
        navigate("/orders");
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't add adress. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-10 btm-comp center py-11">
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
      {confirmOrder && (
        <ConfirmOrder
          showModal={confirmOrder}
          setModal={setConfirmOrder}
          address={selectedAddress!}
          payment={selectedPayment!}
          createOrder={handleCreateOrder}
        />
      )}

      <div className="p-10 btm-comp py-11">
        <div className="flex justify-between">
          <h1 className="text-2xl">Your Cart Items</h1>
          <button className="btn btn-primary" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
        <div className="flex-col center">
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
          <div className="py-8 center">
            <h1 className="text-2xl font-bold text-black">
              Total Price : ₹ {totalPrice * 83}.00
            </h1>
          </div>
          <hr className="w-[1100px] center  border-black" />
        </div>

        <div className="flex items-center justify-between">
          <div className="mt-10 flex gap-10 w-[39rem] items-center relative">
            <h1 className="text-2xl">Delivery address:</h1>
            <div
              className="p-1 bg-white border border-black rounded-sm cursor-pointer w-96 center"
              onClick={() => setShowAddress(!showAddress)}
            >
              Choose delivery address
            </div>

            {showAddress && (
              <div
                ref={addressRef}
                className="p-1 flex flex-col gap-3 absolute top-10 right-[16px] z-50 w-96 border bg-white center border-black rounded-sm "
              >
                {addresses.length === 0 && <p>No Saved address</p>}
                <div className="p-3">
                  {addresses.map((address) => {
                    return (
                      <div
                        className="p-1 text-sm cursor-pointer hover:bg-slate-100 hover:rounded-md"
                        key={address._id}
                        onClick={() => selectDeliveryAddress(address)}
                      >
                        <p>{address.address}</p>
                      </div>
                    );
                  })}
                </div>

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
              className="p-1 bg-white border border-black rounded-sm cursor-pointer w-96 center"
              onClick={() => setShowPayment(!showPayment)}
            >
              Choose payment method
            </div>
            {showPayment && (
              <div
                ref={paymentRef}
                className="absolute right-0 z-50 flex flex-col gap-3 p-1 bg-white border border-black rounded-sm top-10 w-96 center "
              >
                <div className="w-2/3 p-3 text-sm">
                  <p
                    onClick={() => selectDeliveryPayment("COD")}
                    className="py-1 cursor-pointer center hover:bg-slate-100 hover:rounded-md"
                  >
                    Cash on Delivery
                  </p>
                  {payments.map((payment) => {
                    return (
                      <div
                        className="w-full p-1 cursor-pointer center hover:bg-slate-100 hover:rounded-md"
                        key={payment._id}
                        onClick={() => selectDeliveryPayment(payment)}
                      >
                        <p>{payment.paymentType}</p>
                      </div>
                    );
                  })}
                </div>
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
        <div className="p-32 mt-10 center">
          <button
            onClick={showConfirmModal}
            className="w-full text-xl cursor-pointer btn btn-primary"
          >
            Place your Order
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
