import React,{useEffect} from 'react'
import { useWeather } from '../../context/weatherContext'
import {useFormik} from "formik"
import axios from 'axios'

function Searchbar() {
    const {location,setLocation,setWeather} = useWeather()

    const formik = useFormik({
      initialValues: {
        locationValue: ''
       
      },
      onSubmit: values => {
        setLocation(values.locationValue)
        values.locationValue=""
      },
    });

   
 
  useEffect(()=>{
    try{
       axios(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=P3U499RHLFELZ26HDA6D78FK9`)
      .then((res) => setWeather([res.data]))
    }catch(err){
        alert("Hava durumu bilgisi bulunamadı.");

    }
      
  },[location])
   
  return (
    <div>
        <form className='flex  flex-row-reverse justify-center items-center'  onSubmit={formik.handleSubmit}>
            <button className='hover:bg-blue-800 transition-all rounded-lg '>
            <svg  className='fill-white stroke-white' xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M32.542 33.167 22 22.625q-1.25 1.125-2.875 1.708-1.625.584-3.25.584-3.833 0-6.479-2.646T6.75 15.792q0-3.834 2.646-6.479 2.646-2.646 6.479-2.646 3.792 0 6.479 2.646 2.688 2.645 2.688 6.479 0 1.708-.625 3.333-.625 1.625-1.709 2.792l10.542 10.5Zm-16.667-9.25q3.458 0 5.813-2.334 2.354-2.333 2.354-5.791 0-3.459-2.354-5.792-2.355-2.333-5.813-2.333-3.417 0-5.771 2.333T7.75 15.792q0 3.458 2.354 5.791 2.354 2.334 5.771 2.334Z"/></svg>
            </button>
            <input className=' mx-4 text-center my-6 border-0 bg-sky-300 h-10 w-32  focus:outline-none rounded-xl placeholder:text-gray-200 text-gray-200 placeholder:text-center   transition-all focus:w-96  focus:bg-sky-300 focus:border-0 text-lg bg-fixed'  placeholder='Search...'  
            name='locationValue' 
            type="text"
            onChange={formik.handleChange}
            value={formik.values.locationValue}
            i
            />
            

        </form>
        </div>
  )
}

export default Searchbar
