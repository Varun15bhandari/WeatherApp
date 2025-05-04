import React, { useState } from 'react';
import './SearchBar.css';

const API_KEY = 'd1cbd2ec48115631dce49ceb5a1b7d84'; // Replace with your API key

const SearchBar = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // First get coordinates by city name
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${API_KEY}`
      );
      
      if (!geoResponse.ok) {
        throw new Error('City search failed');
      }
      
      const geoData = await geoResponse.json();
      
      if (geoData.length === 0) {
        setSearchResults([]);
        setError('No cities found. Please try another search term.');
        setIsLoading(false);
        return;
      }
      
      setSearchResults(geoData);
    } catch (err) {
      setError('An error occurred while searching for cities. Please try again.');
      console.error('Search error:', err);
    }
    
    setIsLoading(false);
  };

  const handleCityClick = async (city) => {
    setIsLoading(true);
    
    try {
      // Get current weather data for selected city
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Weather data fetch failed');
      }
      
      const weatherData = await weatherResponse.json();
      
      // Pass the weather data to parent component
      onCitySelect(weatherData);
      
      // Clear search results but keep the search term
      setSearchResults([]);
    } catch (err) {
      setError('Failed to load weather data. Please try again.');
      console.error('Weather data error:', err);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <div className="search-input-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a city..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>

      {isLoading && <div className="search-loading">Loading...</div>}
      
      {error && <div className="search-error">{error}</div>}
      
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((city, index) => (
            <li 
              key={`${city.name}-${index}`}
              onClick={() => handleCityClick(city)}
              className="search-result-item"
            >
              {city.name}, {city.state ? `${city.state}, ` : ''}{city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;