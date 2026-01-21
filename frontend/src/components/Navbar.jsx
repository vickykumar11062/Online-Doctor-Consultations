import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { assets } from "./../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import Login from "./../pages/Login.jsx";

const Navbar = ({ isDarkMode, toggleDarkMode }) => {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex gap-2">
        {token && userData ? (
          <div className="flex items-center gap-2 group relative cursor-pointer">
            <img
              className="w-8 rounded-full"
              src={userData.image}
              alt="profile-pic"
            />
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="dropdown_icon"
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 dark:bg-gray-900 dark:text-white flex flex-col gap-4 p-4 ">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black dark:hover:text-gray-200 cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-black dark:hover:text-gray-200 cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black dark:hover:text-gray-200 cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-primary text-white px-6 py-3 rounded-full font-light hidden md:block"
            >
              Create account
            </button>
            <Login isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        )}
        <button
          onClick={() =>
          (window.location.href =
            "https://online-doctor-consult-admin-panel.onrender.com/")
          }
          className="bg-primary text-white px-4 py-1 rounded-full font-light hidden md:block"
        >
          Admin Login
        </button>
        
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 cursor-pointer md:hidden"
          src={assets.menu_icon}
          alt=""
        />
        {/* ------mobile menu  ----- */}
        <div
          className={`${showMenu ? "fixed w-full" : "h-0 w-0"
            } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7 cursor-pointer dark:bg-white"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">CONTACT</p>
            </NavLink>
            {/* {
              !token && !userData && <div><button onClick={() => setIsOpen(true)} className="px-6 py-2 rounded-full font-semibold text-xl">Create account</button>
                <Login isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            } */}
            <button
              onClick={() =>
              (window.location.href =
                "https://online-doctor-consult-admin-panel.onrender.com/")
              }
              className="px-6 py-2 rounded-full font-semibold text-xl cursor-pointer"
            >
              Admin Login
            </button>
          </ul>
        </div>
        <DarkModeSwitch checked={isDarkMode} onChange={toggleDarkMode} size={26} className='mt-2'/>
      </div>
    </div>
  );
};

export default Navbar;
