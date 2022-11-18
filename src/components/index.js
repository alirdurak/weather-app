import React from 'react';
import {useEffect} from 'react';
import {useWeather} from  "../context/weatherContext";
import Searchbar from './searchbar';
import useGeolocation from "react-hook-geolocation";
import axios from 'axios';





function Weather() {
  const {weather, setWeather} = useWeather();
  const {latitude,longitude} = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout: 12000,
  });
  
  const firstWeatherAPI = async() => {
    try{
        await axios(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=metric&key=P3U499RHLFELZ26HDA6D78FK9 `)
        .then((res)=>setWeather([res.data]))
    }catch(err){
        alert("Lütfen konum bilgisi girin.")
    }
}
    

  useEffect(()=>{
    firstWeatherAPI()
  },[])

  

    return (
    <div className='flex flex-col justify-center items-center '>
      <div className='bg-blue-900 w-full sticky top-0'>
          <Searchbar  ></Searchbar>
      </div>
      <h2 className='font-bold text-xl text-white bg-blue-900 w-full text-center'>{weather.map((i, key)=> i.resolvedAddress)}</h2 >
      
       {weather == "" ?<p className='font-semibold text-lg text-slate-900'>Loading...</p>: null }
      <div className='flex justify-center   mt-10   '>
        <ul className='list-none grid grid-cols-3 w-8/12 py-0 px rounded-3xl text-slate-800 font-semibold bg-sky-200 opacity-100 '>
          {   
            weather.map((i,key)=> 
                      
              i.days.map((e,key)=><li className=' flex flex-col items-center text-center hover:bg-sky-300 rounded-3xl transition-all bg-sky-200 opacity-100 ' key={key}>
              <br /> 
              <br /> <span className='font-semibold text-lg'>{e.datetime}</span>
              <br />  <img src={require(`../icons/${e.icon}.svg`)} alt={e.icon} style={{ width:"10em" }} />
              <br /> <span className='flex justify-start mx-2'>{e.description}</span> 
              <span className=' flex content-center  '> Temperature: {e.temp} <svg className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#262656" d="M15 21c-3.3 0-6-2.7-6-6V9c0-3.3 2.7-6 6-6s6 2.7 6 6c0 .6-.4 1-1 1s-1-.4-1-1c0-2.2-1.8-4-4-4s-4 1.8-4 4v6c0 2.2 1.8 4 4 4s4-1.8 4-4c0-.6.4-1 1-1s1 .4 1 1c0 3.3-2.7 6-6 6zM5.5 8C4.1 8 3 6.9 3 5.5S4.1 3 5.5 3 8 4.1 8 5.5 6.9 8 5.5 8zm0-3c-.3 0-.5.2-.5.5s.2.5.5.5.5-.2.5-.5-.2-.5-.5-.5z"/></svg>   </span> 
               <span className='flex'> Maximum Temperature: {e.tempmax} <svg className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#262656" d="M15 21c-3.3 0-6-2.7-6-6V9c0-3.3 2.7-6 6-6s6 2.7 6 6c0 .6-.4 1-1 1s-1-.4-1-1c0-2.2-1.8-4-4-4s-4 1.8-4 4v6c0 2.2 1.8 4 4 4s4-1.8 4-4c0-.6.4-1 1-1s1 .4 1 1c0 3.3-2.7 6-6 6zM5.5 8C4.1 8 3 6.9 3 5.5S4.1 3 5.5 3 8 4.1 8 5.5 6.9 8 5.5 8zm0-3c-.3 0-.5.2-.5.5s.2.5.5.5.5-.2.5-.5-.2-.5-.5-.5z"/></svg></span>
              <span className='flex'> Minimum Temperature: {e.tempmin} <svg className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#262656" d="M15 21c-3.3 0-6-2.7-6-6V9c0-3.3 2.7-6 6-6s6 2.7 6 6c0 .6-.4 1-1 1s-1-.4-1-1c0-2.2-1.8-4-4-4s-4 1.8-4 4v6c0 2.2 1.8 4 4 4s4-1.8 4-4c0-.6.4-1 1-1s1 .4 1 1c0 3.3-2.7 6-6 6zM5.5 8C4.1 8 3 6.9 3 5.5S4.1 3 5.5 3 8 4.1 8 5.5 6.9 8 5.5 8zm0-3c-.3 0-.5.2-.5.5s.2.5.5.5.5-.2.5-.5-.2-.5-.5-.5z"/></svg></span>
               <span className='flex items-center '> <p className='mx-2'> Sunrise: {e.sunrise}</p> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="translate(1 1)"><path d="M16 16a5 5 0 00-10 0M11 0v7M3.22 8.22l1.42 1.42M0 16h2M20 16h2M17.36 9.64l1.42-1.42M22 20H0M7 4l4-4 4 4"/></g></svg>  </span>   <span className='flex'> <p className='mx-2'> Sunset: {e.sunset}</p> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22"><path fill="none" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17a5 5 0 0 0-10 0M12 8V1M4.22 9.22l1.42 1.42M1 17h2M21 17h2M18.36 10.64l1.42-1.42M23 21H1M16 4l-4 4-4-4"/></svg></span>
              
              </li>) )   
          }

        </ul>
      </div>
    </div>
  )
}

export default Weather
