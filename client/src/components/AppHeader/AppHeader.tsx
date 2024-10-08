import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../../utils/constants";

const AppHeader = () => {
  return (
    <div className="fixed text-black top-0 left-0 z-10 w-full border-b border-black ">
      <nav className="container flex justify-between py-4">
        <Link
          to="/"
          className="flex justify-center items-center text-4xl font-dance font-bold"
        >
          Shoppy
        </Link>
        <ul className="flex items-center gap-4">
          {navLinks.map((link) => (
            <li key={link.name} className="hover:scale-105">
              <Link to={link.to}>{link.name}</Link>
            </li>
          ))}
          <Link to="/auth/signup" className="btn-primary btn">
            Shop now
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default AppHeader;
