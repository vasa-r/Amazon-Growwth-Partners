import axios, { AxiosError } from "axios";

const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

const getPayments = async () => {
  try {
    const response = await axios.get(`${BACKEND_ORIGIN_URL}/payment`, {
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

const addPayment = async (
  name: string,
  paymentType: string,
  cardNumber: string | null,
  cvv: string | null,
  upiId: string | null
) => {
  try {
    const response = await axios.post(
      `${BACKEND_ORIGIN_URL}/payment`,
      {
        name,
        paymentType,
        cardNumber,
        cvv,
        upiId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
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

export { addPayment, getPayments };
