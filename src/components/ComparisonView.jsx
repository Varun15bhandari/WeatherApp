import React from 'react';
import './ComparisonView.css';
import WeatherCard from './WeatherCard';

const ComparisonView = ({ cityOne, cityTwo, onAddToFavorites }) => {
  if (!cityOne || !cityTwo) {
    return <div className="comparison-view loading">Loading comparison...</div>;
  }

  // Calculate temperature difference
  const tempDiff = Math.round(cityOne.main.temp - cityTwo.main.temp);
  const humidityDiff = cityOne.main.humidity - cityTwo.main.humidity;

  return (
    <div className="comparison-view">
      <div className="comparison-cards">
        <WeatherCard 
          cityData={cityOne} 
          onAddToFavorites={onAddToFavorites} 
          isComparison={true} 
        />
        <WeatherCard 
          cityData={cityTwo} 
          onAddToFavorites={onAddToFavorites} 
          isComparison={true} 
        />
      </div>

      <div className="comparison-stats">
        <h3>Comparison</h3>
        
        <div className="stat-item">
          <span className="stat-label">Temperature Difference:</span>
          <span className="stat-value">
            {tempDiff > 0 
              ? `${cityOne.name} is ${Math.abs(tempDiff)}°C warmer` 
              : tempDiff < 0 
                ? `${cityOne.name} is ${Math.abs(tempDiff)}°C cooler` 
                : "Same temperature"}
          </span>
        </div>

        <div className="stat-item">
          <span className="stat-label">Humidity Difference:</span>
          <span className="stat-value">
            {humidityDiff > 0 
              ? `${cityOne.name} is ${Math.abs(humidityDiff)}% more humid` 
              : humidityDiff < 0 
                ? `${cityOne.name} is ${Math.abs(humidityDiff)}% less humid` 
                : "Same humidity"}
          </span>
        </div>

        <div className="comparison-actions">
          <button 
            className="favorite-button" 
            onClick={() => onAddToFavorites(cityOne)}
          >
            Save {cityOne.name}
          </button>
          <button 
            className="favorite-button" 
            onClick={() => onAddToFavorites(cityTwo)}
          >
            Save {cityTwo.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;