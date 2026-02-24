import { useEffect, useState } from "react";
import { classifyClimate } from "@/utils/classifyClimate";

interface WeatherData {
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  climateType?: string;
}

export function useWeather(city: string) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWeather() {
      try {
        const response = await fetch(`/api/weather?city=${city}`);
        const result = await response.json();

        const climateType = classifyClimate(
          result.temperature,
          result.condition
        );

        setData({ ...result, climateType });
      } catch (err) {
        setError("Erro ao carregar clima");
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [city]);

  return { data, loading, error };
}