import axios from 'axios';
import { useState } from "react";

function App() {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    function handleChange(e) {
        setLocation(e.target.value);
    }

    const fetchWeather = async () => {
        if (!location) {
            setError('Please enter a location');
            setWeatherData(null);
            return;
        }

        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=959eacd45469e5d71cfe21106f832da5`);
            setWeatherData(res.data);
            setError('');
        } catch (err) {
            setError('Location not found');
            setWeatherData(null);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchWeather();
        }
    };

    return (
        <div>
          <div className='input'>
            <input
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                 
            />
            
            
             </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weatherData && (
                <div className='container'>
                  <div className='box1'>
                                   
                     <h2 className='location'>{weatherData.name} 
                    <br /> <span className='temp'>{weatherData.main.temp}</span> 
                     </h2>
                  
                    <p className='condition'> {weatherData.weather[0].description}</p>
                    </div>
                    <div className='box2'>
                    <p className='feelslike'> {weatherData.main.feels_like} <br /> <span >Feels Like</span> </p>
                    <p className='humidity'>{weatherData.main.humidity} <br /> <span>Humidity </span> </p>
                    <p className='windspeed'> {weatherData.wind.speed} KPH <br /> <span>Wind Speed</span> </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;