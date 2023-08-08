// src/api/weatherApi.ts
import axios from 'axios';

const API_KEY = '0eac44119c4a96973cbc215f7dba346b'; // Replace with your actual API key

const weatherApi = {
  fetchWeatherData: async () => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_KEY}`);
    return response.data;
  },
};

export default weatherApi;
