import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import validateLogin from "../../validation/validateLogin";
import { toast } from "react-toastify";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

interface Initialvalues {
  email: string;
  password: string;
}

const Login = () => {
  const initialValues: Initialvalues = {
    email: "",
    password: "",
  };
  const [credentials, setCredentials] = useState<Initialvalues>(initialValues);
  const [formErrors, setFormErrors] = useState<Partial<Initialvalues>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { loginContext, setToken } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateLogin(credentials);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        await login();
      } catch (error) {
        console.log(error);
        toast.error("Login failed, please try again.");
      } finally {
        setIsLoading(false);
        setCredentials(initialValues);
      }
    } else {
      toast.error("Please ensure valid info is given");
    }
  };

  const login = async () => {
    try {
      const response = await loginUser(credentials.email, credentials.password);
      if (response.success || response.status === 202) {
        toast.success(response?.data?.message);
        localStorage.setItem("token", response?.data?.token);
        setToken(response?.data?.token);
        loginContext(response?.data?.token);
        setCredentials(initialValues);
      } else {
        toast.error(response?.data?.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <form className="w-96 flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            title="email address"
            placeholder="Enter your email"
          />
          <p className="error">{formErrors?.email && formErrors.email}</p>
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            title="password"
            placeholder="Enter your password"
          />
          <p className="error">{formErrors?.password && formErrors.password}</p>
        </div>
        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          Login
        </button>
        <p className="text-sm text-center">
          New to shoppy?
          <Link to="/auth/signup" className="underline cursor-pointer">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
