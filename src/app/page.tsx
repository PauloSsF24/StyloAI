"use client";

import { useEffect, useState } from "react";

interface Weather {
  temperature: number;
  city: string;
  condition: string;
  icon: string;
}

interface Look {
  id: string;
  imageUrl: string;
  nome: string;
}

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [looks, setLooks] = useState<Look[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // 1️⃣ Buscar clima
        const weatherRes = await fetch("/api/weather");
        const weatherData = await weatherRes.json();
        setWeather(weatherData);

        if (!weatherData?.temperature) {
          setLoading(false);
          return;
        }

        // 2️⃣ Buscar looks recomendados
        const looksRes = await fetch(
          `/api/looks/recommended?temp=${weatherData.temperature}&occasion=casual`
        );

        const looksData = await looksRes.json();
        setLooks(looksData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-[#E7DBD0] p-8">

      {/* WEATHER CARD */}
      <div className="mt-12 flex justify-center">
        {weather && (
          <div className="bg-brand-surface shadow-xl rounded-3xl px-10 py-6 flex items-center gap-8">
            <div>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt="Weather icon"
                  className="w-20 h-20"
                />
            </div>

            <div className="text-4xl font-bold text-brand-primary">
              {weather.temperature}°C
            </div>

            <div className="text-lg font-medium text-brand-accent">
              {weather.city}
            </div>
          </div>
        )}
      </div>

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center mt-16 text-brand-primary">
        Dicas de Looks
      </h2>

      {/* CAROUSEL */}
      <div className="mt-10 flex gap-8 overflow-x-auto px-6">
        {loading && (
          <p className="text-center w-full text-gray-500">
            Carregando recomendações...
          </p>
        )}

        {!loading && looks.length === 0 && (
          <p className="text-center w-full text-gray-500">
            Nenhum look recomendado no momento.
          </p>
        )}

        {looks.map((look) => (
          <div
            key={look.id}
            className="min-w-62.5 h-80 bg-white rounded-2xl shadow-lg"
          >
            <img
              src={look.imageUrl}
              alt="Look"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>
    </main>
  );
}