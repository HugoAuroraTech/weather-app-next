import { useState } from "react";

type WeatherData = {
    name: string;
    sys: {country: string};
    main: {temp: number; humidity: number}
    weather: {description: string; icon: string}[];
}

type WeatherCardProps = {
    weather:WeatherData;
}

export default function WeatherCard({weather}: WeatherCardProps) {
    return (
        <div className="bg-white p-8 rounded shadow-md mt-8 w-80 text-center text-black">
            <h2 className="text-2x1 text-black font-bold">
                {weather.name}, {weather.sys.country}
            </h2>
            <img 
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} 
            alt={weather.weather[0].description} 
            className="mx-auto"
            />
            <p className="text-x1 text-black">Temperature: {weather.main.temp} °C</p>
            <p className="text-lg text-black">Humidity: {weather.main.humidity} %</p>
            <p className="italic text-black">{weather.weather[0].description}</p>
        </div>
    )

}