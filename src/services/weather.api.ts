export async function fetchWeather(city: string) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar clima");
  }

  const data = await response.json();

  return {
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    condition: data.weather[0].main,
    description: data.weather[0].description,
  };
}