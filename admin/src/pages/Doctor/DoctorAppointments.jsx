import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext.jsx'
import { AppContext } from '../../context/AppContext.jsx';
import { assets } from './../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, CancelAppointment, CompleteAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDataFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white dark:bg-gray-900 border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <ul className='hidden sticky top-0 bg-gray-200 dark:bg-gray-950 z-10 sm:grid grid-cols-[0.5fr_2fr_1.5fr_1fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <li>#</li>
          <li>Patient</li>
          <li>Payment</li>
          <li>Age</li>
          <li>Date & Time</li>
          <li>Fees</li>
          <li>Actions</li>
        </ul>
        <ul>
          {appointments.reverse().map((item, index) => (
            <li
              className='flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1.5fr_1fr_3fr_1fr_1fr]  py-4 px-6 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-950 transition'
              key={index}
            >
              <span className='max-sm:hidden'>{index + 1}</span>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userData.image} alt='' />
                <span>{item.userData.name}</span>
              </div>
              <div>
                <p className='text-xs inline border border-blue-600 px-2 rounded-full'>{item.payment ? 'Online' : 'Cash'}</p>
              </div>
              <span className='max-sm:hidden'>{calculateAge(item.userData.dob)}</span>
              <span>{slotDataFormat(item.slotDate)}, {item.slotTime}</span>
              <span>{currency}{item.amount}</span>
              {
                item.cancelled
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                    : <div className="flex items-center gap-2">
                      <img onClick={() => CancelAppointment(item._id)} className="w-10 cursor-pointer hover:scale-105 transition" src={assets.cancel_icon} alt="Cancel" />
                      <img onClick={() => CompleteAppointment(item._id)} className="w-10 cursor-pointer hover:scale-105 transition" src={assets.tick_icon} alt="tick_icon" />
                    </div>
              }

            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DoctorAppointments
