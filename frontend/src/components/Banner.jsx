import React, { useState } from "react";
import { assets } from "../assets/assets";
import Login from "../pages/Login";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:mx-12 my-20 md-mx-12">
      {/* left */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        <div>
          <button onClick={() =>{ setIsOpen(true),scrollTo(0,0)}} className="sm:text-base bg-white px-8 py-3 rounded-full text-gray-600 text-sm mt-6 hover:scale-105 transition-all duration-300">Create account</button>
          <Login isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>

      {/* right */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets.appointment_img}
          alt="header_img"
        />
      </div>
    </div>
  );
};

export default Header;
