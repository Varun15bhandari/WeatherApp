import React from 'react';
import './FavoriteCities.css';

const API_KEY = 'd1cbd2ec48115631dce49ceb5a1b7d84'; 
const FavoriteCities = ({ favorites, onCitySelect, onRemoveFromFavorites }) => {
  if (favorites.length === 0) {
    return (
      <div className="favorites-container empty">
        <h2>Favorite Cities</h2>
        <p>You haven't added any favorite cities yet.</p>
      </div>
    );
  }

  const handleFavoriteClick = async (city) => {
    try {
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }
      
      const weatherData = await response.json();
      onCitySelect(weatherData);
    } catch (err) {
      console.error('Error fetching updated weather data:', err);
      onCitySelect(city);
    }
  };

  return (
    <div className="favorites-container">
      <h2>Favorite Cities</h2>
      <div className="favorites-list">
        {favorites.map((city) => (
          <div key={city.id} className="favorite-item">
            <div 
              className="favorite-name"
              onClick={() => handleFavoriteClick(city)}
            >
              {city.name}, {city.sys.country}
            </div>
            <button 
              className="remove-favorite" 
              onClick={() => onRemoveFromFavorites(city.name)}
              title="Remove from favorites"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCities;