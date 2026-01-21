import React from "react";
import { assets } from "./../assets/assets";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <div>
        <div className="text-center text-2xl pt-10 text-gray-600 dark:text-white">
          <p>
            CONTACT{" "}
            <span className="font-medium text-gray-700 dark:text-gray-200">
              US
            </span>
          </p>
        </div>

        <div className="my-10 flex flex-col md:flex-row justify-center gap-10 mb-28 text-sm">
          <img
            className="w-full md:max-w-[360px]"
            src={assets.contact_image}
            alt=""
          />
          <div className="flex flex-col items-start gap-6 justify-center">
            <p className="font-semibold text-lg text-gray-600 dark:text-white">
              Our OFFICE
            </p>
            <p className="text-gray-500 dark:text-gray-200">
              342802 Jodhpur Station <br />
              Jodhpur 342802, Rajasthan, India
            </p>
            <p className="text-gray-500 dark:text-gray-200">
              Tel: (+91) 9128634469 <br /> Email: vickykumar11062003@gmail.com
            </p>
            <p className="font-semibold text-lg text-gray-600 dark:text-gray-200">
              Careers at PRESCRIPTO
            </p>
            <p className="text-gray-500 dark:text-gray-200">
              Learn more about our teams and job openings.
            </p>
            <button className="border border-black px-7 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500 dark:border-white">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
