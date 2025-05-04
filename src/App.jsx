import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import FavoriteCities from './components/FavoriteCities';
import ComparisonView from './components/ComparisonView';

function App() {
  const [currentCity, setCurrentCity] = useState(null);
  const [comparisonCity, setComparisonCity] = useState(null);
  const [isComparing, setIsComparing] = useState(false);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [mode, setMode] = useState('single'); // 'single' or 'compare'

  // Load favorite cities from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (savedFavorites) {
      setFavoriteCities(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  const handleCitySelect = (cityData) => {
    if (mode === 'single') {
      setCurrentCity(cityData);
      setIsComparing(false);
    } else if (mode === 'compare') {
      if (!currentCity) {
        setCurrentCity(cityData);
      } else if (!comparisonCity) {
        setComparisonCity(cityData);
        setIsComparing(true);
      } else {
        // If both cities are already set, replace the first one
        setCurrentCity(cityData);
      }
    }
  };

  const toggleMode = () => {
    if (mode === 'single') {
      setMode('compare');
      setIsComparing(false);
    } else {
      setMode('single');
      setComparisonCity(null);
      setIsComparing(false);
    }
  };

  const addToFavorites = (cityData) => {
    if (!favoriteCities.some(city => city.name === cityData.name)) {
      setFavoriteCities([...favoriteCities, cityData]);
    }
  };

  const removeFromFavorites = (cityName) => {
    setFavoriteCities(favoriteCities.filter(city => city.name !== cityName));
  };

  const resetComparison = () => {
    setCurrentCity(null);
    setComparisonCity(null);
    setIsComparing(false);
  };

  return (
    <div className="app">
      <header>
        <h1>Weather App</h1>
        <button className="toggle-mode" onClick={toggleMode}>
          {mode === 'single' ? 'Switch to Compare Mode' : 'Switch to Single Mode'}
        </button>
      </header>

      <main>
        <SearchBar onCitySelect={handleCitySelect} />
        
        {mode === 'compare' && (
          <div className="comparison-instructions">
            {!currentCity && !comparisonCity && <p>Select first city to compare</p>}
            {currentCity && !comparisonCity && <p>Select second city to compare</p>}
            {currentCity && comparisonCity && (
              <button className="reset-button" onClick={resetComparison}>
                Reset Comparison
              </button>
            )}
          </div>
        )}

        {mode === 'single' && currentCity && (
          <div className="weather-display">
            <WeatherCard 
              cityData={currentCity} 
              onAddToFavorites={addToFavorites} 
            />
          </div>
        )}

        {mode === 'compare' && isComparing && (
          <ComparisonView 
            cityOne={currentCity} 
            cityTwo={comparisonCity} 
            onAddToFavorites={addToFavorites} 
          />
        )}

        <FavoriteCities 
          favorites={favoriteCities} 
          onCitySelect={handleCitySelect} 
          onRemoveFromFavorites={removeFromFavorites} 
        />
      </main>

      <footer>
        <p>Weather data powered by OpenWeatherMap</p>
      </footer>
    </div>
  );
}

export default App;