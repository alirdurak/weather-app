import React,{ createContext, useContext,  useState,  } from "react";



const WeatherContext = createContext();

export const WeatherProvider = ({children}) => {
    const [location, setLocation] = useState("")
    const [weather, setWeather] = useState([])

    const values = {
        location,
        setLocation,
        weather,
        setWeather,
    }
    return (
        <WeatherContext.Provider  value={values}>
            {children}
        </WeatherContext.Provider>   
         )
}

    export const useWeather = ()=> useContext(WeatherContext)