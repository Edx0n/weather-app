import axios from "axios";

const url = "https://api.openweathermap.org/data/2.5/weather";

//env
const apiKey = process.env.REACT_APP_API_KEY;

export const fetchWeatherData = async (cityName) => {
  try {
    const response = await axios.get(`${url}?q=${cityName}&appid=${apiKey}`);

    return response.data;
  } catch (error) {
    console.error("Error while the api is in process:", error?.message);
    throw error;
  }
};
