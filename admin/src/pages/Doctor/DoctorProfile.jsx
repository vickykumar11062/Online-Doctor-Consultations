import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { useState } from 'react'
import { toast } from 'react-toastify';
import  axios  from 'axios';

const DoctorProfile = () => {
  const {dToken,profileData,setProfileData,getProfileData} = useContext(DoctorContext)
  const {currency,backendUrl} = useContext(AppContext)

  const [isEdit,setIsEdit] = useState(false)

  const updateProfile = async ()=>{
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const {data} = await axios.post(`${backendUrl}/api/doctor/update-profile`,updateData,{headers:{dToken}})

      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()

      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(dToken){
      getProfileData()
    }
  },[dToken])

  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-blue-600 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt={profileData.name} />
        </div>
        <div className='flex-1 border border-stone-200 rounded-lg p-8 py-7 bg-white dark:bg-gray-900 relative'>

          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700 dark:text-white'>{profileData.name}</p>

          <div className='flex items-center gap-2 mt-1 text-gray-600 dark:text-gray-200'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3 dark:text-gray-200'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1 dark:text-gray-400'>{profileData.about}</p>
          </div>

          <p className='text-gray-600 font-medium mt-4 dark:text-white'>Appointment fee: <span className='text-gray-800 dark:text-gray-100'>{currency} {isEdit ? <input className='p-1 border border-gray-600 outline-none rounded-lg dark:bg-gray-950' type="number" onChange={(e)=>setProfileData(prev => ({...prev,fees:e.target.value}))} value={profileData.fees}/> : profileData.fees}</span></p>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ? <input className='p-1 mb-1 border border-gray-600 outline-none rounded-lg mb-0.5 dark:bg-gray-950' type="text" onChange={(e)=> setProfileData(prev =>({...prev,address: {...prev.address,line1: e.target.value}}))} value={profileData.address.line1}/> : profileData.address.line1}
              <br />
              {isEdit ? <input className='p-1 border border-gray-600 outline-none rounded-lg dark:bg-gray-950' type="text" onChange={(e)=> setProfileData(prev =>({...prev,address: {...prev.address,line2: e.target.value}}))} value={profileData.address.line2}/> : profileData.address.line2}
            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input checked={profileData.available} onChange={()=> isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} type="checkbox" name="" id="" />
            <label htmlFor="">Available</label>
          </div>
          {
            isEdit
            ? <button onClick={()=> updateProfile()} className='px-4 py-1 border border-blue-600 text-sm rounded-full mt-5 hover:bg-blue-600 hover:text-white transition-all absolute top-0.5 right-1.5'>Save</button>
            : <button onClick={()=> setIsEdit(true)} className='px-4 py-1 border border-blue-600 text-sm rounded-full mt-5 hover:bg-blue-600 hover:text-white transition-all absolute top-0.5 right-1.5'>Edit</button>
          }

        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
