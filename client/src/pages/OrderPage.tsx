import React, { useEffect, useState } from "react";
import { getOrders } from "../api/order";
import { formatDate } from "../utils/constants";

interface Product {
  id: string;
  image: string;
  price: string;
  quantity: string;
  title: string;
}

interface Order {
  _id: string;
  address: string;
  createdAt: string;
  deliveryDate: string;
  orderedDate: string;
  paymentMode: string;
  products: Product[];
  totalPrice: number;
  updatedAt: string;
  user: string;
  __v: number;
}

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[] | null>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center p-10 btm-comp">
      {orders && orders.length > 0 ? (
        <div className="py-6 ">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 mb-6 border border-gray-300 rounded-md order-item"
            >
              <h3 className="text-xl font-bold">Order ID: {order._id}</h3>
              <p className="text-md">Ordered Date: {order.orderedDate}</p>
              <p className="text-md">
                Delivery Date: {formatDate(order.deliveryDate)}
              </p>
              <p className="text-md">Payment Mode: {order.paymentMode}</p>
              <p className="font-bold text-md">
                Total Price: ₹ {order.totalPrice}
              </p>
              <div className="products-list">
                <h4 className="mt-4 text-lg font-semibold">Products:</h4>
                {order.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 mt-2 product-item"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-cover w-16 h-16"
                    />
                    <div>
                      <p>{product.title}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: ₹ {product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your Orders will be listed here</p>
      )}
    </div>
  );
};

export default OrderPage;
