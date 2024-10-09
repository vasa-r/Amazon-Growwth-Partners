import React from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import AuthPage from "./pages/AuthPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  const { token } = useAuth();
  return (
    <>
      <ToastContainer />
      <div className="h-[calc(100vh-80px)] w-screen">
        <AppHeader />
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="products" /> : <HomePage />}
          />
          <Route
            path="/auth/*"
            element={token ? <Navigate to={"/products"} /> : <AuthPage />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<MainPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
