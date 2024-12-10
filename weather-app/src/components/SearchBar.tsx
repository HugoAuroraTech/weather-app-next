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
    <div className="max-w-md mx-auto flex gap-2 p-4 bg-white rounded-lg shadow-md ">
      <input
        type="text"
        placeholder="Enter a city"
        className="p-2 border border-gray-300 rounded-lg w-full text-black"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
