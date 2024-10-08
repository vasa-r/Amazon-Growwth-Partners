import React from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import AuthPage from "./pages/AuthPage";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div className="h-[calc(100vh-80px)] w-screen">
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/*" element={<AuthPage />} />
      </Routes>
    </div>
  );
};

export default App;
