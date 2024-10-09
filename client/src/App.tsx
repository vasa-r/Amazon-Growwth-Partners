import React, { Suspense } from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import AuthPage from "./pages/AuthPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUs";
import LazyLoader from "./components/LoadingComponents/LazyLoader";

const MainPage = React.lazy(() => import("./pages/MainPage"));
const ProductPage = React.lazy(() => import("./pages/ProductPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const OrderPage = React.lazy(() => import("./pages/OrderPage"));

const App = () => {
  const { token } = useAuth();

  return (
    <>
      <ToastContainer />
      <div className="h-[calc(100vh-80px)] w-screen">
        <AppHeader />
        <Suspense fallback={<LazyLoader />}>
          <Routes>
            <Route
              path="/"
              element={token ? <Navigate to="products" /> : <HomePage />}
            />
            <Route
              path="/auth/*"
              element={token ? <Navigate to={"/products"} /> : <AuthPage />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/query" element={<ContactUsPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/products" element={<MainPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrderPage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
