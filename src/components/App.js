import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import "../styles.scss";
import { weatherDescriptionTranslations } from "./contants";
import { fetchWeatherData } from "../api";

import { toast } from "react-toastify";

const WeatherApp = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    fetchWeatherData(searchTerm)
      .then((data) => {
        setWeatherData(data);
        setIsLoading(false);
        return toast.success("Sucesso");
      })
      .catch((error) => {
        setIsLoading(false);
        return toast.error(error.response.data.message);
      });
  };

  const formatTemperature = (temp) => {
    return (temp - 273.15).toFixed(2);
  };

  useEffect(() => {
    if (weatherData) {
      handleFormSubmit();
    }
  }, []);

  const cleanData = () => {
    setSearchTerm("");
    setWeatherData(null);
  };

  const translateWeatherDescription = (description) => {
    const key = description.toLowerCase().replace(/\s/g, "");
    return weatherDescriptionTranslations[key] || description;
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <br></br>
        {isLoading && <CircularProgress />}
        {weatherData && (
          <div id="weather">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
              alt={translateWeatherDescription(
                weatherData?.weather[0]?.description
              )}
              id="icon"
            />
            <h1 id="Degrees">{formatTemperature(weatherData?.main?.temp)}°C</h1>

            <h2 id="city">{weatherData?.name}</h2>
            <button id="change" onClick={cleanData}>
              Clear
            </button>
            <div className="info">
              <div>
                <h3>Wind</h3>
                <div className="value">
                  {Math.round(weatherData?.wind?.speed)}
                  <span> km/h</span>
                </div>
              </div>

              <div>
                <h3>Feels like</h3>
                <div className="value">
                  {formatTemperature(weatherData?.main?.temp)}
                  <span> °C</span>
                </div>
              </div>

              <div>
                <h3>Humidity</h3>
                <div className="value">
                  {Math.round(weatherData?.main?.humidity)}
                  <span> %</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default WeatherApp;
