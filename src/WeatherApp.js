import React, { useState } from 'react';

function WeatherApp(){
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);


const API_KEY = '496542406630698eab4f46b60403a2bd' //MY API KEY


const get_weather = async () =>{
    if(!city) return;
    setLoading(true);
    try{
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await res.json();
        setWeather(data); 
    } catch(err){
        console.error(err);
    }
    setLoading(false);
};
return (
    <div>
        <input type="text" placeholder="Enter city..." value={city} 
        onChange={(e)=>{setCity(e.target.value)}} />
        <button onClick={get_weather}>Get Weather</button>

        {loading && <p>Loading...</p>}
        {weather && weather.main && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>🌡️ {weather.main.temp}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="icon"
          />
        </div>
        )}
    </div>
);
}

export default WeatherApp;