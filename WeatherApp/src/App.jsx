import { useState, useEffect } from "react";
import { format } from 'date-fns'; 
import axios from 'axios'

import './App.css'


function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [location, setLocation] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=5&aqi=yes&alerts=yes`)
        setWeatherData(response.data)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    };
    if (location) {
      fetchData();
    }
  }, [location])

  const handleLocationChange = (event) =>{
    setLocation(event.target.value); 
  }
  console.log(weatherData)
  return(
    <>
    <div className="main-container">
      {weatherData && (<h1 className="main-title">{weatherData.location.region}</h1>)}
      <h1 className="main-title">Weather Forecast</h1>
      <div className="input-container">
      <input
      className="input"
      type="text"
      placeholder="Enter your city"
      value={location}
      onChange={handleLocationChange}
       />
       </div>
       </div>

     
       {weatherData && (
        <div className='weather-container'>

          {weatherData.forecast.forecastday.map((day) => (
          <div className='day-container' key={day.date}>
                <img className='weather-icon' src={day.day.condition.icon} alt={day.day.condition.text} />
                <h1 className='temperature'> {day.day.avgtemp_c} C</h1>
                <p className='date'> {format(new Date(day.date), 'EEEE, MMMM d')}</p> {/* Format the date and day name */}
                <p className='date'> {day.day.condition.text}</p>
            </div>

          ))}


        </div>


      )}
    
    </>

  )
}

export default App