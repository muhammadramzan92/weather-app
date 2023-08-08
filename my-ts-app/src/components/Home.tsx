import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Card, Spin } from 'antd';
import weatherApi from '../api/weatherApi';
import './Home.css'; 

function Home() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [countdown, setCountdown] = useState(60); // Initial countdown value
  const { data, isLoading, isError, refetch } = useQuery('weatherData', weatherApi.fetchWeatherData);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
      setRefreshCounter(prevCounter => prevCounter + 1);
      setCountdown(60); // Reset countdown to 60 seconds after refresh
    }, 60000); // Refresh every 60 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [refetch]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000); // Update countdown every 1 second

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error loading weather data</div>;
  }

  return (
    <div className="centered-content with-background"> {/* Apply centered and background styles here */}
      <Card title="Weather Data">
        <p>Temperature: {data?.main.temp} K</p>
        <p>Weather: {data?.weather[0].description}</p>
        <p>Humidity: {data?.main.humidity}%</p>
        <p>Data last refreshed: {refreshCounter} times</p>
        <p>Next refresh in: {countdown} seconds</p>
      </Card>
    </div>
  );
}

export default Home;
