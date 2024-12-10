import { useState } from "react";

type SearchBarProps = {
    onSearch: (city: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [city, setCity] = useState("");

    const handleSearch = () => {
        if (city.trim()) {
            onSearch(city);
        } else {
            alert("Please enter a city name.");
        }
    };

    return (
        <div className="flex gap-2">
            <input
                type="text"
                placeholder="Enter a city"
                className="p-2 border border-gray-300 rounded text-black"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSearch}>Search</button>
        </div>
    );

}