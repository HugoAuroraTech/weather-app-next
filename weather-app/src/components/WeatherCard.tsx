type WeatherData = {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number };
  weather: { description: string; icon: string }[];
};

type WeatherCardProps = {
  weather: WeatherData;
};

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md w-full h-full m-8 ">
      <h2 className="text-2xl font-bold text-blue-500 text-center">
        {weather.name}, {weather.sys.country}
      </h2>
      <div className="flex flex-col items-center">
        <img
          src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
          alt={weather.weather[0].description}
          className="mx-auto"
        />
        <p className="text-x1 text-black">
          Temperature: {weather.main.temp} °C
        </p>
        <p className="text-lg text-black">
          Humidity: {weather.main.humidity} %
        </p>
        <p className="italic text-black">{weather.weather[0].description}</p>
      </div>
    </div>
  );
}
