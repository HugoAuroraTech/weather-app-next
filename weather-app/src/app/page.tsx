"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";

type WeatherData = {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number };
  weather: { description: string; icon: string }[];
};

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  // Função para buscar coordenadas a partir do nome da cidade
  const fetchCoordinates = async (city: string) => {
    const apiKey = "9affb3720b8bb78feec02665109f6388";
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city
    )}&limit=1&appid=${apiKey}`;

    setLoading(true);

    try {
      const response = await fetch(geoUrl);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setLoading(false);
        fetchWeatherByCoords(lat.toString(), lon.toString());
      } else {
        throw new Error("Cidade não encontrada!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || "Erro ao buscar coordenadas!");
      } else {
        alert("Erro desconhecido!");
      }
      setWeather(null);
    }
  };

  // Função para buscar dados climáticos usando latitude e longitude
  const fetchWeatherByCoords = async (latitude: string, longitude: string) => {
    const apiKey = "9affb3720b8bb78feec02665109f6388";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt`;

    try {
      const response = await fetch(weatherUrl);
      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error("Erro ao buscar dados climáticos!");
      }

      setWeather(data); // Salva os dados recebidos
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || "Erro ao buscar coordenadas!");
      } else {
        alert("Erro desconhecido!");
      }
      setWeather(null);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
      <SearchBar onSearch={fetchCoordinates} />

      {loading && <p className="text-blue-500 mt-4">Buscando dados...</p>}

      {weather && <WeatherCard weather={weather} />}
    </main>
  );
}
