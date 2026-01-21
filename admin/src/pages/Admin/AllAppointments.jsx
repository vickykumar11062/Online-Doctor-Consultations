import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext.jsx';
import { AppContext } from '../../context/AppContext.jsx';
import { assets } from '../../assets/assets.js';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancleAppointment } = useContext(AdminContext);
  const { calculateAge, slotDataFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white dark:bg-gray-900 border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <ul className='hidden sticky top-0 bg-gray-200 dark:bg-gray-950 z-10 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <li>#</li>
          <li>Patient</li>
          <li>Age</li>
          <li>Date & Time</li>
          <li>Doctor</li>
          <li>Fees</li>
          <li>Actions</li>
        </ul>
        <ul>
          {appointments.map((item, index) => (
            <li
              className='flex flex-col sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-4 px-6 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-950 transition'
              key={index}
            >
              <span className='max-sm:hidden'>{index + 1}</span>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userData.image} alt='' />
                <span>{item.userData.name}</span>
              </div>
              <span className='max-sm:hidden'>{calculateAge(item.userData.dob)}</span>
              <span>{slotDataFormat(item.slotDate)}, {item.slotTime}</span>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full bg-gray-100' src={item.DocData.image} alt='' />
                <span>{item.DocData.name}</span>
              </div>
              <span>{currency}{item.amount}</span>
              <div className="flex items-center gap-2">
                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-semibold">Cancelled</p>
                ) : item.isCompleted
                  ? <p className='text-green-500 text-xs font-semibold'>Completed</p>
                  : (
                    <img
                      onClick={() => cancleAppointment(item._id)}
                      className="w-8 h-8 cursor-pointer hover:scale-105 transition"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                  )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllAppointments;
