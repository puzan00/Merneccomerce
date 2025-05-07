import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});

  };

  const toggleMenu = () => {
    setVisible(!visible);
  };

  const cartItemCount = getCartCount(); // Calculate cart item count

  return (
    <div className="relative">
      <div className="flex items-center justify-between py-4 px-4 md:py-6 md:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="transition-transform hover:scale-105 z-20">
          <img src={assets.logo} alt="logo" className="w-16 md:w-20" />
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 lg:space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-700 font-medium hover:text-blue-600 ${isActive ? "text-blue-600" : ""
                }`
              }
            >
              <div className="flex flex-col items-center">
                Home
                <hr className="my-4 border-gray-300" />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/collection"
              className={({ isActive }) =>
                `text-gray-700 font-medium hover:text-blue-600 ${isActive ? "text-blue-600" : ""
                }`
              }
            >
              <div className="flex flex-col items-center">
                Collection
                <hr className="my-4 border-gray-300" />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-gray-700 font-medium hover:text-blue-600 ${isActive ? "text-blue-600" : ""
                }`
              }
            >
              <div className="flex flex-col items-center">
                About
                <hr className="my-4 border-gray-300" />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-gray-700 font-medium hover:text-blue-600 ${isActive ? "text-blue-600" : ""
                }`
              }
            >
              <div className="flex flex-col items-center">
                Contact
                <hr className="my-4 border-gray-300" />
              </div>
            </NavLink>
          </li>
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-6">
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 cursor-pointer"
            onClick={() => setShowSearch(true)} // Enable search on click
          />

          <div className="group relative">
            <img onClick={() => token ? null : navigate("/login")}
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt="Profile"
            />


            {/* Dropdown Menu */}
            {token && <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
              <div className="py-1">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </NavLink>
                <NavLink
                  to="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Orders
                </NavLink>
                <div className="border-t border-gray-200"></div>
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>

            }
          </div>
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              alt="Cart"
              className="w-5 cursor-pointer"
            />
            {cartItemCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </div>
            )}
          </Link>
        </div>

        {/* Mobile Icons */}
        <div className="flex md:hidden items-center gap-4 z-20">
          {/* Search icon */}
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 cursor-pointer"
            onClick={() => setShowSearch(true)} // Enable search on click
          />

          {/* Profile icon */}
          <div className="relative">
            <img
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt="Profile"
            />
          </div>

          {/* Cart icon */}
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              alt="Cart"
              className="w-5 cursor-pointer"
            />
            {cartItemCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </div>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="flex flex-col space-y-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ease-in-out ${visible ? "rotate-45 translate-y-2" : ""
                }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-opacity duration-300 ease-in-out ${visible ? "opacity-0" : "opacity-100"
                }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ease-in-out ${visible ? "-rotate-45 -translate-y-2" : ""
                }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-10 transition-transform duration-300 ease-in-out ${visible ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full pt-20 px-8">
          <ul className="flex flex-col space-y-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-xl text-gray-700 font-medium ${isActive ? "text-blue-600" : ""
                  }`
                }
                onClick={() => setVisible(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/collection"
                className={({ isActive }) =>
                  `text-xl text-gray-700 font-medium ${isActive ? "text-blue-600" : ""
                  }`
                }
                onClick={() => setVisible(false)}
              >
                Collection
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-xl text-gray-700 font-medium ${isActive ? "text-blue-600" : ""
                  }`
                }
                onClick={() => setVisible(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-xl text-gray-700 font-medium ${isActive ? "text-blue-600" : ""
                  }`
                }
                onClick={() => setVisible(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="mt-8">
            <button
              className="flex items-center gap-3 text-lg text-red-600 hover:text-red-700"
              onClick={() => {
                /* add logout logic */
              }}
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;