import Cart from "../../assets/cart.svg";
import User from "../../assets/user.svg";
import Logout from "../../assets/logout.svg";
import Orders from "../../assets/orders.svg";
import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";

const AppHeader = () => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const { token } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();
  const { logoutContext } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  const handleLogout = () => {
    logoutContext();
    setShowProfile(false);
  };

  return (
    <div className="fixed top-0 left-0 z-10 w-full text-black bg-white border-b border-black">
      <nav className="container flex justify-between py-4">
        <Link
          to="/"
          className="flex items-center justify-center text-4xl font-bold font-dance"
        >
          Shoppy
        </Link>
        {!token && (
          <ul className="flex items-center gap-4">
            {navLinks.map((link) => (
              <li key={link.name} className="hover:scale-105">
                <Link className="text-lg" to={link.to}>
                  {link.name}
                </Link>
              </li>
            ))}
            <Link to="/auth/signup" className="btn-primary btn">
              Shop now
            </Link>
          </ul>
        )}

        {token && (
          <div className="relative flex items-center gap-4">
            <Link className="text-lg hover:scale-105" to={"/"}>
              Home
            </Link>
            <Link to={"/cart"}>
              <img
                className="cursor-pointer w-9 hover:scale-105"
                src={Cart}
                alt="cart"
              />
            </Link>
            <img
              className="cursor-pointer w-9 hover:scale-105"
              src={User}
              ref={menuButtonRef}
              alt="cart"
              onClick={() => setShowProfile((prev) => !prev)}
            />
            {showProfile && (
              <div
                ref={menuRef}
                className="absolute right-0 flex flex-col gap-3 p-4 text-lg bg-white border border-black top-16"
              >
                <div
                  onClick={() => navigate("/orders")}
                  className="flex items-center gap-2 cursor-pointer btn btn-primary"
                >
                  Orders <img className="w-6" src={Orders} alt="logout" />
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer btn btn-primary"
                  onClick={handleLogout}
                >
                  Logout <img className="w-6" src={Logout} alt="logout" />
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default AppHeader;
