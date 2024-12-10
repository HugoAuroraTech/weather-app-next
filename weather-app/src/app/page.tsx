'use client'

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";

export default function Home() {
  const [weather, setWeather] = useState<any>(null);
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
        fetchWeatherByCoords(lat.toString(), lon.toString());
      } else {
        throw new Error("Cidade não encontrada!");
      }
    } catch (error: any) {
      alert(error.message || "Erro ao buscar coordenadas!");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar dados climáticos usando latitude e longitude
  const fetchWeatherByCoords = async (latitude: string, longitude: string) => {
    const apiKey = "9affb3720b8bb78feec02665109f6388";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt`;

    try {
      const response = await fetch(weatherUrl);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Erro ao buscar dados climáticos!");
      }

      setWeather(data); // Salva os dados recebidos
    } catch (error: any) {
      alert(error.message || "Erro na busca!");
      setWeather(null); // Limpa os dados se houver erro
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">

      <SearchBar onSearch={fetchCoordinates} />

      {loading && <p className="text-blue-500 mt-4">Buscando dados...</p>}

      {weather && <WeatherCard weather={weather} />}
    </main>
  );
}