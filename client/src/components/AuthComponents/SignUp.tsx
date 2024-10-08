import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <form className="w-96 flex flex-col gap-3">
        <div className="">
          <label htmlFor="userName">Full Name</label>
          <input
            type="text"
            id="userName"
            title="user name"
            placeholder="Enter your name"
          />
        </div>
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
        <div className="">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="text"
            id="password"
            title="confirm password"
            placeholder="Confirm your password"
          />
        </div>
        <button className="btn btn-primary">Sign Up</button>
        <p className="text-sm text-center">
          Already have an acoount?
          <Link to="/auth/login" className="underline cursor-pointer">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
