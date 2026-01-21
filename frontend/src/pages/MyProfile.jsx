import React, { useContext, useState } from "react";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, UploadUserProfileData } =
    useContext(AppContext);
  const [image, setImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const UpdateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await UploadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <>
        <div className="mx-auto bg-white dark:bg-gray-900 shadow-md rounded-md mt-10 border border-blue-600 relative">
          <div className="flex flex-col p-6 items-center sm:flex-row sm:items-start">
            {isEdit ? (
              <label htmlFor="image">
                <div className="inline-block relative cursor-pointer">
                  {/* Profile Image Preview */}
                  <img
                    className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : userData.image
                    }
                    alt="Profile Preview"
                  />
                  {/* Upload Icon */}
                  {!image && (
                    <img
                      className="w-8 h-8 absolute bottom-2 right-2"
                      src={
                        assets.upload_icon
                      }
                      alt="Upload Icon"
                    />
                  )}
                </div>
                {/* File Input */}
                <input
                  type="file"
                  id="image"
                  accept="image/*" // Allow only image uploads
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            ) : (
              <img
                src={userData.image}
                alt="Profile"
                className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
              />
            )}

            <div className="sm:ml-6 mt-4 sm:mt-10 text-center sm:text-left">
              {isEdit ? (
                <input
                  type="text"
                  value={userData.name}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none dark:bg-gray-600 focus:ring focus:ring-blue-200"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {userData.name}
                </h2>
              )}
            </div>
          </div>

          <div className="w-full h-0.5 bg-blue-600"></div>

          <div className="grid grid-cols-1 p-6 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-600 dark:text-white">Email:</h3>
              <p className="text-gray-300">{userData.email}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-600 dark:text-white">Phone:</h3>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none dark:bg-gray-600 focus:ring focus:ring-blue-200"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <p className="text-gray-800 dark:text-gray-300">+91{userData.phone}</p>
              )}
            </div>
            <div className="col-span-2">
              <h3 className="font-semibold text-gray-600 dark:text-white">Address:</h3>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={userData.address.line1}
                    className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none dark:bg-gray-600 focus:ring focus:ring-blue-200"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input
                    type="text"
                    value={userData.address.line2}
                    className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none dark:bg-gray-600 focus:ring focus:ring-blue-200"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </div>
              ) : (
                <p className="text-gray-800 dark:text-gray-200">
                  {userData.address.line1} <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>

          <div className="w-full h-0.5 bg-blue-600"></div>

          <div className="grid grid-cols-1 p-6 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-600 dark:text-white">Gender:</h3>
              {isEdit ? (
                <select
                  value={userData.gender ?? "Male"}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none dark:bg-gray-600 focus:ring focus:ring-blue-200"
                  onChange={(e) => {
                    console.log("Selected Gender:", e.target.value);
                    setUserData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }));
                  }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-800 dark:text-gray-200">{userData.gender}</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-600 dark:text-white">Birthday:</h3>
              {isEdit ? (
                <input
                  type="date"
                  value={userData.dob}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none dark:bg-gray-600 focus:ring focus:ring-blue-200"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <p className="text-gray-800 dark:text-gray-200">{userData.dob}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end p-6 absolute top-[-10px] right-[-10px]">
            {isEdit ? (
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                onClick={UpdateUserProfileData}
              >
                Save Information
              </button>
            ) : (
              <button
                className="bg-red-500 text-white px-4 py-1 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring focus:ring-gray-200"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
        <Footer />
      </>
    )
  );
};

export default MyProfile;
