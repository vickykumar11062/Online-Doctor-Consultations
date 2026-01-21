import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import Footer from "../components/Footer";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const slotDataFormat = (slotDate) => {
    const dateArray = slotDate.split('-')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }
  const navigate = useNavigate()
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);

        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }

        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-6  mt-10">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        My Appointments
      </h1>
      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-50 p-4 rounded-md shadow-md dark:bg-gray-900"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0 mb-4 sm:mb-0">
              <img
                src={item.DocData.image}
                alt={item.DocData.name}
                className="w-24 h-24 rounded-full border-2 border-gray-200"
              />
            </div>

            {/* Doctor Details */}
            <div className="sm:ml-6 flex-1 text-center sm:text-left">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {item.DocData.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-200">{item.DocData.speciality}</p>
              <div className="mt-2 text-gray-600 dark:text-gray-200">
                <p className="font-medium">Address:</p>
                <p>{item.DocData.address.line1}</p>
                <p>{item.DocData.address.line2}</p>
              </div>
              <p className="mt-2 text-gray-800 dark:text-white">
                <span className="font-semibold">Date & Time:</span>{" "}
                {slotDataFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 mt-4 sm:mt-0">
              {
                item.isCompleted
                  ? <button className="text-green-500 px-4 py-2 hover:text-green-600">Completed</button>
                  : item.cancelled
                    ? <button className="text-red-500 px-4 py-2 hover:text-red-600 ">Appointment cancelled</button>
                    : <div className="flex- gap-2">
                      <button onClick={()=> appointmentRazorpay(item._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 mr-1">Pay Online</button>
                      <button onClick={() => cancelAppointment(item._id)} className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200">Cancel Appointment</button>
                    </div>
              }
              {/* {
                !item.cancelled && <button onClick={()=> appointmentRazorpay(item._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">Pay Online</button>
              }
              {
                !item.cancelled && <button onClick={() => cancelAppointment(item._id)} className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200">Cancel Appointment</button>
              }
              {
                item.cancelled && <button className="text-red-500 px-4 py-2 hover:text-red-600 ">Appointment cancelled</button>
              } */}
              {/* {item.isCompleted && <button>Completed</button>} */}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default MyAppointments;
