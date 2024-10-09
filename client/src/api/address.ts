import axios, { AxiosError } from "axios";

const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

const getAddresses = async () => {
  try {
    const response = await axios.get(`${BACKEND_ORIGIN_URL}/address`, {
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

const addAddress = async (
  addressTitle: string,
  buildNo: string,
  address: string,
  city: string,
  pincode: string,
  phone: string
) => {
  try {
    const response = await axios.post(
      `${BACKEND_ORIGIN_URL}/address`,
      {
        addressTitle,
        buildNo,
        address,
        city,
        pincode,
        phone,
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

export { getAddresses, addAddress };
