interface Props {
  weather: {
    temperature: number;
    city: string;
    condition: string;
  };
}

export default function WeatherCard({ weather }: Props) {
  return (
    <div className="bg-white shadow-xl rounded-3xl px-10 py-6 flex items-center gap-8">
      <div className="text-5xl">☀️</div>

      <div className="text-4xl font-bold">
        {weather.temperature}°C
      </div>

      <div className="text-lg font-medium">
        {weather.city}
      </div>
    </div>
  );
}