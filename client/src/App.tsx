import React from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import AuthPage from "./pages/AuthPage";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage";

const App = () => {
  return (
    <div className="h-[calc(100vh-80px)] w-screen">
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/products" element={<MainPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
};

export default App;
