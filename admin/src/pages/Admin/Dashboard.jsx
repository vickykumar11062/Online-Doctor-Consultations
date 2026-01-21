import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from './../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { aToken, cancleAppointment, DashboardData, getDashboardData } = useContext(AdminContext)
  const { slotDataFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashboardData()
    }
  }, [aToken])

  console.log(DashboardData);

  return DashboardData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center bg-white dark:bg-gray-900 gap-2 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600 dark:text-white'>{DashboardData.doctors}</p>
            <p className='text-gray-500 dark:text-gray-200'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white dark:bg-gray-900 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600 dark:text-white'>{DashboardData.appointments}</p>
            <p className='text-gray-500 dark:text-gray-200'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white dark:bg-gray-900 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600 dark:text-white'>{DashboardData.patients}</p>
            <p className='text-gray-500 dark:text-gray-200'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white dark:bg-gray-900 '>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {DashboardData.latestAppointments && DashboardData.latestAppointments.length > 0 ? (
            DashboardData.latestAppointments.map((item, index) => (
              <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-200'>
                {/* Doctor Image */}
                <img className='w-10 rounded-full bg-gray-100' src={item?.DocData?.image} alt={item?.DocData?.name} />
                <div className='flex-1 text-sm'>
                  <p className='font-medium text-gray-800 dark:text-white'>{item?.DocData?.name}</p>
                  <p className='text-sm text-gray-600 dark:text-gray-200'>{slotDataFormat(item?.slotDate)}</p>
                </div>


                {/* Cancel Button / Status */}
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
            ))
          ) : (
            <p className='text-center py-4 text-gray-500 dark:text-white'>No latest appointments available.</p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard