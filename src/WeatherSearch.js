import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function WeatherSearch() {
  let [city, setCity] = useState(null);
  // sets up setCity function using search input value as city
  let [loaded, setLoaded] = useState(false);
  // sets up variable that will tell us if we have results to display
  // loaded by default will be false
  let [weather, setWeather] = useState(null);
  // get temp from city search, setTemp function will set the temp value to this
  // null because by default we don't have a temp, but we want to store the temp of the city searched

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temp: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
    console.log(response.data);
  }
  // setLoaded to true will display weather UI, only is true when somnething is searched and api gets back with data
  // setWeather sets weather values for the city searched temperature in API data

  //handleSubmit receives event because it's an event listener
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "15b6ba0523386a8a73b38b2440a74dea";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    // prevent reload of page
    // have to have access to city in search input - need to create a useState
    // get apiUrl - make API call used search input value
    // displaWeather - call update weather UI
  }

  //updateCity receives event because it's an event listener
  // calls setCity using the value of the search input and applies it as city
  function updateCity(event) {
    setCity(event.target.value);
  }

  // let form keeps search field and button always visible, as form variable is used in both cases
  // add event listener handleSubmit to make API call when submit is click
  // add event listener onChange - whenever search input changes, call updateCity
  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={updateCity}
      />
      <button type="submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temp)}C</li>
          <li>Description: {weather.description}</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>
            <img src={weather.icon} alt="weather icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
