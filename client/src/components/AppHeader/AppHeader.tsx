import Cart from "../../assets/cart.svg";
import User from "../../assets/user.svg";
import Logout from "../../assets/logout.svg";
import Orders from "../../assets/orders.svg";
import { Link } from "react-router-dom";
import { navLinks } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";

const AppHeader = () => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const { token } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLImageElement>(null);
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
    <div className="fixed text-black top-0 left-0 z-10 w-full border-b border-black bg-white">
      <nav className="container flex justify-between py-4">
        <Link
          to="/"
          className="flex justify-center items-center text-4xl font-dance font-bold"
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
          <div className="flex items-center gap-4 relative">
            <Link className="text-lg hover:scale-105" to={"/"}>
              Home
            </Link>
            <Link to={"/cart"}>
              <img
                className="w-9 cursor-pointer hover:scale-105"
                src={Cart}
                alt="cart"
              />
            </Link>
            <img
              className="w-9 cursor-pointer hover:scale-105"
              src={User}
              ref={menuButtonRef}
              alt="cart"
              onClick={() => setShowProfile((prev) => !prev)}
            />
            {showProfile && (
              <div
                ref={menuRef}
                className="absolute right-0 top-16 text-lg border flex flex-col gap-3 bg-white border-black p-4"
              >
                <div className="flex btn btn-primary cursor-pointer items-center gap-2">
                  Orders <img className="w-6" src={Orders} alt="logout" />
                </div>
                <div
                  className="flex btn btn-primary cursor-pointer items-center gap-2"
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
