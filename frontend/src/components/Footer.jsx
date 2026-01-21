import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10 bg-gray-200">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        {/* left */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600 dark:text-white leading-6">
            <span className="font-semibold">Telemedicine</span> is a project
            designed to make healthcare more accessible by connecting patients
            and doctors remotely. The platform allows users to consult with
            medical professionals, share reports, and get guidance without the
            need for physical visits, saving both time and effort.
          </p>
        </div>

        {/* center  */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600 dark:text-white">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* right */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600 dark:text-white">
            <li>+91-912-863-4469</li>
            <li>vickykumar11062003@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* copyright */}
      <div>
        <hr />
        <p className="text-sm text-center py-5">
          Copyright © 2025 Telemedicine - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
