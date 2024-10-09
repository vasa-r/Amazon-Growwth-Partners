import axios, { AxiosError } from "axios";

interface OrderType {
  id: string;
  image: string;
  price: string;
  quantity: string;
  title: string;
}

const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

const getOrders = async () => {
  try {
    const response = await axios.get(`${BACKEND_ORIGIN_URL}/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log(response.data.data);
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

const addorder = async (
  address: string | undefined,
  products: OrderType[],
  totalPrice: number,
  paymentMode: string | undefined
) => {
  try {
    const response = await axios.post(
      `${BACKEND_ORIGIN_URL}/orders`,
      {
        address,
        products,
        totalPrice,
        paymentMode,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data.data);
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

export { addorder, getOrders };
