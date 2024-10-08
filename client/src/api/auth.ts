import axios, { AxiosError } from "axios";

const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

const registerUser = async (
  userName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${BACKEND_ORIGIN_URL}/user/signup`, {
      userName,
      email,
      password,
    });

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BACKEND_ORIGIN_URL}/user/login`, {
      email,
      password,
    });
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

export { registerUser, loginUser };
