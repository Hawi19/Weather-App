
import { useState } from "react";

function App() {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState({
        main: {
            feels_like: '',
            humidity: ''
        },
        wind: { speed: '' },
        weather: [{ description: '' }],
        name: ''
    });
    const [error, setError] = useState('');

    function handleChange(e) {
        setLocation(e.target.value);
    }

    const fetchWeather = async () => {
        if (!location) {
            setError('Please enter a location');
            return;
        }
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=959eacd45469e5d71cfe21106f832da5`);
            if (!response.ok) {
                throw new Error('Location not found');
            }
            const data = await response.json();
            setWeatherData(data);
            setError('');
        } catch (err) {
            setError(err.message);
            setWeatherData({
                main: {
                    feels_like: '',
                    humidity: ''
                },
                wind: { speed: '' },
                weather: [{ description: '' }],
                name: ''
            });
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
            <div className='container'>
                <div className='box2'>
                    {weatherData.name ? (
                        <div>
                        <div  className="upper-box">
                           
                            <h2 className='location'>{weatherData.name}  <br /> <span className='temp'>{weatherData.main.temp}</span> </h2>


                          
                           
                            <p className='condition'>{weatherData.weather[0].description}<br /><span>Weather Condition</span></p>
                            </div>
                          <div className="bottom-box2">
                            <p className='feelslike'>{weatherData.main.feels_like} <br /><span>Feels Like</span></p>
                            <p className='humidity'>{weatherData.main.humidity} <br /><span>Humidity</span></p>
                            <p className='windspeed'>{weatherData.wind.speed} KPH<br /><span>Wind Speed</span></p>
                            </div>
                        </div>
                    ) : (
                        <div className="bottom-box">

                           <p className='feelslike'>Feels Like</p>
                          <p className='humidity'>Humidity</p>
                         <p className='windspeed'>Wind Speed</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;