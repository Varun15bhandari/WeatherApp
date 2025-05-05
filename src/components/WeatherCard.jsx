import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ cityData, onAddToFavorites, isComparison = false }) => {
  if (!cityData || !cityData.weather) {
    return <div className="weather-card loading">Loading weather data...</div>;
  }

  const { name, main, weather, sys } = cityData;
  
  
  const temperature = Math.round(main.temp);
  
  
  const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  
  
  const weatherDescription = weather[0].description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className={`weather-card ${isComparison ? 'comparison' : ''}`}>
      <div className="weather-header">
        <h2>{name}, {sys.country}</h2>
        {!isComparison && (
          <button 
            className="favorite-button" 
            onClick={() => onAddToFavorites(cityData)}
            title="Add to favorites"
          >
            ★
          </button>
        )}
      </div>
      
      <div className="weather-info">
        <img 
          src={weatherIcon} 
          alt={weatherDescription} 
          className="weather-icon" 
        />
        
        <div className="weather-temp">
          <span className="temperature">{temperature}°C</span>
          <span className="description">{weatherDescription}</span>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Feels like:</span>
          <span className="detail-value">{Math.round(main.feels_like)}°C</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Humidity:</span>
          <span className="detail-value">{main.humidity}%</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Pressure:</span>
          <span className="detail-value">{main.pressure} hPa</span>
        </div>
        
        {cityData.wind && (
          <div className="detail-item">
            <span className="detail-label">Wind:</span>
            <span className="detail-value">{Math.round(cityData.wind.speed * 3.6)} km/h</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;