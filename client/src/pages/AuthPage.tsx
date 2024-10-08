import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../components/AuthComponents/SignUp";
import Login from "../components/AuthComponents/Login";

const AuthPage = () => {
  return (
    <div className="btm-comp">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AuthPage;
