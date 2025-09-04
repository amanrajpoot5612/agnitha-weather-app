import { useState, useRef } from "react";

export default function CitySearch({ onSelect }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const debounceRef = useRef(null);

    const fetchCities = async (value) => {
        if (value.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            const res = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(value)}`
            );
            const data = await res.json();
            setSuggestions((data.results || []).slice(0, 5));
            setActiveIndex(-1);
        } catch (error) {
            console.error('Error fetching cities:', error);
            setSuggestions([]);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        // Debouncing
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            fetchCities(value);
        }, 300);
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault();
            const selected = suggestions[activeIndex];
            selectCity(selected);
        }
    };

    const selectCity = (city) => {
        setQuery(`${city.name}, ${city.country}`);
        setSuggestions([]);
        setActiveIndex(-1);
        onSelect(city);
    };

    const handleInputBlur = () => {
        // Delay hiding suggestions to allow for click events
        setTimeout(() => {
            setSuggestions([]);
            setActiveIndex(-1);
        }, 150);
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleInputBlur}
                placeholder="Search for a city..."
                className="w-full p-3 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pb-3 border-none "
                id="city-search-input"
            />
            {suggestions.length > 0 && (
                <ul className="absolute z-1 w-full rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((city, index) => (
                        <li
                            key={city.id || `${city.name}-${city.country}-${index}`}
                            className={`p-3 cursor-pointer text-gray-200 border-b last:border-b-0  mt-7 pt-7 ${
                                index === activeIndex 
                                    ? "bg-blue-300 text-white" 
                                    : "hover:bg-gray-50"
                            }`}
                            onMouseDown={() => selectCity(city)} // mouseDown to prevent input blur
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            <div className="font-medium">{city.name}</div>
                            <div className="text-sm opacity-75">{city.country}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}