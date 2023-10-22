import React, { useEffect, useState } from "react";
import "./WeatherApp.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import axios from "axios";

const WeatherApp = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [iwcon, setIWcon] = useState("");

  let api_key = "4407cf237d346eab699d1937ef7a7411";

  const getWeatherDetails = (city) => {
    if(!city) return ;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=Metric&appid=" + api_key;

    axios.get(url).then((res) => {
      setData(res.data);
      console.log(res.data)
    }).catch((err) => {
      console.log("err", err);
    })
    setSearch("");
  };

  const handleClick = () => {
    getWeatherDetails(search);
  }

  useEffect(() => {
    getWeatherDetails("New Delhi");  // onload
    setIWcon(cloud_icon);
  }, [])

  if(data?.weather?.icon === "01d" || data?.weather?.icon === "01n") {
    setIWcon(clear_icon);
  }
  else if(data?.weather?.icon === "02d" || data?.weather?.icon === "02n") {
    setIWcon(cloud_icon);
  }
  else if(data?.weather?.icon === "03d" || data?.weather?.icon === "03n") {
    setIWcon(drizzle_icon);
  }
  else if(data?.weather?.icon === "04d" || data?.weather?.icon === "04n") {
    setIWcon(drizzle_icon);
  }
  else if(data?.weather?.icon === "09d" || data?.weather?.icon === "09n") {
    setIWcon(rain_icon);
  }
  else if(data?.weather?.icon === "10d" || data?.weather?.icon === "10n") {
    setIWcon(rain_icon);
  }
  else if(data?.weather?.icon === "13d" || data?.weather?.icon === "13n") {
    setIWcon(snow_icon);
  }
  // else{
  //   setIWcon(clear_icon);
  // }

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-icon" onClick={handleClick}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={iwcon} alt="" />
      </div>
      <div className="temp">{Math.round(data?.main?.temp)} °C</div>  

      {/*  "?." -> optional chaining operator  */}

      <div className="location">{data.name}, {data?.sys?.country}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{data?.main?.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{Math.round(data?.wind?.speed)} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
