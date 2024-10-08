import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <form className="w-96 flex flex-col gap-3">
        <div className="">
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            id="email"
            title="email address"
            placeholder="Enter your email"
          />
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            title="password"
            placeholder="Enter your password"
          />
        </div>
        <button className="btn btn-primary">Login</button>
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
