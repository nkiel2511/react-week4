import "./styles.css";
import React from "react";
import WeatherSearch from "./WeatherSearch.js";
import axios from "axios";

export default function App() {
  return (
    <div className="App">
      <h1>Weather App</h1>
      <WeatherSearch />
    </div>
  );
}
