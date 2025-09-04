import { useState } from "react";
import CitySearch from "./CitySearch";

// Mock ErrorMessage component
const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {message}
        </div>
    );
};

// Weather code → Emoji mapping
const weatherIcons = {
    0: "☀️ Clear",
    1: "🌤️ Mainly clear",
    2: "⛅ Partly cloudy",
    3: "☁️ Overcast",
    45: "🌫️ Fog",
    48: "🌫️ Rime fog",
    51: "🌦️ Drizzle",
    61: "🌧️ Rain",
    71: "❄️ Snow",
    80: "🌦️ Showers",
    95: "⛈️ Thunderstorm",
};

export default function Weather() {
    const [selectedCity, setSelectedCity] = useState(null);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getWeather = async (cityData) => {
        if (!cityData) {
            setError("Please select a city.");
            return;
        }

        setLoading(true);
        setError("");
        setWeather(null);

        try {
            // For demo purposes, we'll simulate API calls with mock data
            // In real implementation, use the geocoding and weather APIs

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock weather data
            const mockWeatherData = {
                city: cityData.name,
                country: cityData.country,
                temp: `${Math.floor(Math.random() * 30 + 5)}°C`,
                wind: `${Math.floor(Math.random() * 20 + 5)} km/h`,
                condition: Object.values(weatherIcons)[Math.floor(Math.random() * Object.values(weatherIcons).length)],
                humidity: `${Math.floor(Math.random() * 40 + 40)}%`,
                pressure: `${Math.floor(Math.random() * 50 + 1000)} hPa`
            };

            setWeather(mockWeatherData);

        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        getWeather(city);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white w-full flex items-center justify-center">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8 min-h-[calc(100vh-4rem)]">

                    {/* Left Side - Search Section */}
                    <div className="flex flex-col justify-center items-center h-full w-full">
                        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-white/40 border-2 w-full max-w-md" id="search-section">
                            {/* Title */}
                            <h1 className="text-3xl font-bold text-white mb-3 text-center">
                                Weather App
                            </h1>
                            <h2 className="text-white/80 text-center mb-6 text-base">
                                Search for any city to get current weather conditions
                            </h2>

                            {/* Search + Results */}
                            <div className="space-y-6">
                                {/* City search */}
                                <CitySearch onSelect={handleCitySelect} />

                                {/* Selected City */}
                                {selectedCity && (
                                    <div className="pt-4 rounded-lg p-4 text-white text-center mt-5">
                                        <p className="text-sm opacity-80">Selected city:</p>
                                        <p className="text-lg font-semibold text-amber-200">
                                            {selectedCity.name}, {selectedCity.country}
                                        </p>
                                    </div>
                                )}

                                {/* Error */}
                                <ErrorMessage message={error} />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Weather Display */}
                    <div className="flex flex-col justify-center">
                        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-3xl shadow-2xl p-8 min-h-[400px] flex flex-col justify-center h-full border-2">
                            {loading ? (
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                                    <p className="text-gray-600 text-lg">Fetching weather data...</p>
                                </div>
                            ) : weather ? (
                                <div className="text-center space-y-6">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                            {weather.city}
                                        </h2>
                                        <p className="text-gray-600 text-lg">{weather.country}</p>
                                    </div>

                                    <div className="text-8xl mb-4">
                                        {weather.condition.split(" ")[0]}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-transparent rounded-xl p-4">
                                            <p className="text-4xl font-bold text-blue-600">
                                                {weather.temp}
                                            </p>
                                            <p className="text-gray-600">Temperature</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-transparent rounded-xl p-4">
                                                <p className="text-xl font-semibold text-green-600">
                                                    {weather.wind}
                                                </p>
                                                <p className="text-gray-600 text-sm">Wind Speed</p>
                                            </div>

                                            <div className="bg-transparent rounded-xl p-4">
                                                <p className="text-xl font-semibold text-purple-600">
                                                    {weather.humidity}
                                                </p>
                                                <p className="text-gray-600 text-sm">Humidity</p>
                                            </div>
                                        </div>

                                        <div className="bg-transparent rounded-xl p-4">
                                            <p className="text-lg text-orange-600 font-medium">
                                                {weather.condition}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500">
                                    <div className="text-6xl mb-4">🌍</div>
                                    <h3 className="text-2xl font-semibold mb-2">
                                        Welcome to Weather App
                                    </h3>
                                    <p className="text-lg">
                                        Search for a city to view its weather conditions
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}